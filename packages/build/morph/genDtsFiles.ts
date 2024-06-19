/* eslint-disable no-console */
import { compileScript, parse } from '@vue/compiler-sfc'
import { glob, Pattern } from 'fast-glob'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { CompilerOptions, ModuleResolutionKind, OutputFile, Project, ScriptTarget, SourceFile } from 'ts-morph'
import { JsxEmit } from 'typescript'


export interface GenDtsFilesSettings {

  root: string

  /**
   * @example {
   *  outDir: 'build',
   *  baseUrl: workRoot,
      paths: {
        [`${LIB_NAME}/*`]: ['packages/*'],
        [`${LIB_ALIAS}/*`]: ['packages/*'],
      },
   * }
   */
  compilerOptions: CompilerOptions


  globCwd?: string
  globSource: Pattern | Pattern[]
  globIgnore?: string[]

  tsConfigFilePath?: string

  transform?: (code: string) => string


  projectEmit?: boolean

}

export async function genDtsFiles (settings: GenDtsFilesSettings) {

  const workRoot = settings.root
  
  const compilerOptions = settings.compilerOptions

  const defaultTsConfigFilePath = path.resolve(workRoot, 'tsconfig.json')
  const tsConfigFilePath = settings.tsConfigFilePath ?? (
    existsSync(defaultTsConfigFilePath) 
      ? defaultTsConfigFilePath 
      : undefined
  )

  const globSource = settings.globSource
  const globCwd = settings.globCwd ?? workRoot

  const globIgnore = settings.globIgnore ?? [
    'gulpfile.ts', 'package.json', 'node_modules', '**/README.md', '**/__tests__',
  ]

  const transform = settings.transform ?? (code => code)


  const projectEmit = settings.projectEmit

  const project = new Project({
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      strict: false,
      jsx: JsxEmit.Preserve,
      disableSizeLimit: true,
      esModuleInterop: true,
      preserveSymlinks: true,
      moduleResolution: ModuleResolutionKind.Node10,
      target: ScriptTarget.ESNext,
      skipLibCheck: true,
      skipDefaultLibCheck: true,
      baseUrl: workRoot,

      ...compilerOptions,
    },
    tsConfigFilePath,
    skipAddingFilesFromTsConfig: true,
  })

  const filePaths = await glob(globSource, {
    cwd: globCwd,
    onlyFiles: true,
    absolute: true,
    ignore: globIgnore,
  })

  // 添加全局类型
  project.addSourceFilesAtPaths(
    path.resolve(workRoot, 'typings', './**/*{.d.ts,.ts}'),
  )



  const sourceFiles: SourceFile[] = []
  for (const file of filePaths) {

    // 处理.vue文件成.ts文件
    if (file.endsWith('.vue')) {
      const content = readFileSync(file, 'utf-8')
      const sfc = parse(content)
      const { script, scriptSetup } = sfc.descriptor
      if (script || scriptSetup) {
        let content = script?.content ?? ''
        if (scriptSetup) {
          const compiled = compileScript(sfc.descriptor, {
            id: 'xxx',
          })
          content += compiled.content
        }
        const lang = scriptSetup?.lang || script?.lang || 'js'
        const sourceFile = project.createSourceFile(
          `${path.relative(process.cwd(), file)}.${lang}`,
          content,
        )
        sourceFiles.push(sourceFile)
      }
    }

    if (file.endsWith('.ts')) {
      const sourceFile = project.addSourceFileAtPath(file)
      sourceFiles.push(sourceFile)
    }


  }

  const diagnostics = project.getPreEmitDiagnostics()

  if (diagnostics.length > 0) {
    console.warn(
      project.formatDiagnosticsWithColorAndContext(diagnostics),
    )
  }

  // 发射.d.ts 文件到内存

  if (projectEmit) {
    await project.emit({
      emitOnlyDtsFiles: true,
    })
  }


  const outputFiles: OutputFile[] = []
  for (const sourceFile of sourceFiles) {
    const relativePath = path.relative(workRoot, sourceFile.getFilePath())

    const emitOutput = sourceFile.getEmitOutput()
    const emitFiles = emitOutput.getOutputFiles()

    if (emitFiles.length === 0) {
      console.warn(`没有找到要输出的文件: ${relativePath}`)
      return
    }

    outputFiles.push(...emitFiles)
  }  



  for (const outputFile of outputFiles) {
    const filepath = outputFile.getFilePath()

    mkdirSync(path.dirname(filepath), {
      recursive: true,
    })

    writeFileSync(
      filepath,
      transform(outputFile.getText()),
      'utf8',
    )

  }


}