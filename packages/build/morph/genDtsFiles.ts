import type { Pattern } from 'fast-glob'
import type { CompilerOptions, OutputFile, ProjectOptions, SourceFile } from 'ts-morph'
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { glob, sync as globSync } from 'fast-glob'
import { ModuleResolutionKind, Project, ScriptTarget } from 'ts-morph'
import * as ts from 'typescript'
import { createParsedCommandLineByJson, createVueLanguagePlugin } from '@vue/language-core'
import { proxyCreateProgram } from '@volar/typescript'

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

  projectOptions?: ProjectOptions

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
    'gulpfile.ts',
    'package.json',
    'node_modules',
    '**/README.md',
    '**/__tests__',
  ]

  const transform = settings.transform ?? (code => code)

  const projectEmit = settings.projectEmit

  const baseCompilerOptions = {
    allowJs: true,
    declaration: true,
    emitDeclarationOnly: true,
    noEmitOnError: true,
    strict: false,
    jsx: ts.JsxEmit.Preserve,
    disableSizeLimit: true,
    esModuleInterop: true,
    preserveSymlinks: false,
    moduleResolution: ModuleResolutionKind.Node10,
    target: ScriptTarget.ESNext,
    skipLibCheck: true,
    skipDefaultLibCheck: true,
    baseUrl: workRoot,
    strictNullChecks: true,
    ...compilerOptions,
  }

  const project = new Project({
    compilerOptions: baseCompilerOptions,

    tsConfigFilePath,

    skipAddingFilesFromTsConfig: true,
    ...settings.projectOptions,
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

  const vueFilePaths = filePaths.filter(file => file.endsWith('.vue'))

  const sourceFiles: SourceFile[] = []
  for (const file of filePaths) {
    if (file.endsWith('.ts')) {
      const sourceFile = project.addSourceFileAtPath(file)
      sourceFiles.push(sourceFile)
    }
    if (file.endsWith('.tsx')) {
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

  // .vue 文件用 @vue/language-core（vue-tsc 的核心）生成精确的组件类型声明，
  // 避免手动编译 .vue 产生的 TS2742（cannot be named）与 props 类型丢失问题
  if (vueFilePaths.length > 0) {
    const vueOutputFiles = await emitVueDtsFiles(vueFilePaths, {
      workRoot,
      globCwd,
      baseCompilerOptions,
    })
    outputFiles.push(...vueOutputFiles)
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

/**
 * 使用 @vue/language-core + @volar/typescript 生成 .vue 组件的 .d.ts 文件。
 *
 * .vue 不能直接作为 ts.createProgram 的 rootName（会报 TS6054），
 * 因此创建一个临时入口文件 import 所有 .vue，让它们通过 import 链进入 program，
 * 再借由 @volar 的 decorateProgram 在 emit 时输出精确的 .vue.d.ts。
 */
async function emitVueDtsFiles (
  vueFiles: string[],
  settings: {
    workRoot: string
    globCwd: string
    baseCompilerOptions: CompilerOptions
  },
): Promise<OutputFile[]> {
  const { workRoot, globCwd, baseCompilerOptions } = settings

  const outDir = baseCompilerOptions.outDir
  if (!outDir) {
    return []
  }

  // 从 tsconfig 解析 vue 编译器选项（默认 target 匹配当前 vue 版本）
  const parsed = createParsedCommandLineByJson(ts, ts.sys, globCwd, {})
  const vueOptions = parsed.vueOptions

  // 临时入口文件：import 所有 .vue
  const entryFile = path.join(globCwd, '__vunk_vue_dts_entry__.ts')
  const entryBaseName = path.basename(entryFile).replace(/\.ts$/, '.d.ts')
  const imports = vueFiles.map((file, index) => {
    const rel = './' + path.relative(globCwd, file).split(path.sep).join('/')
    return `export { default as _${index} } from '${rel}'`
  })
  writeFileSync(entryFile, imports.join('\n') + '\n')

  // 全局类型（与 ts-morph 流程保持一致）
  const typingsRoot = path.resolve(workRoot, 'typings')
  const typingsFiles = existsSync(typingsRoot)
    ? globSync('**/*{.d.ts,.ts}', { cwd: typingsRoot, absolute: true })
    : []

  const vueCompilerOptions: ts.CompilerOptions = {
    ...(baseCompilerOptions as ts.CompilerOptions),
    declaration: true,
    emitDeclarationOnly: true,
    noEmitOnError: false,
    allowArbitraryExtensions: true,
    // 与 ts-morph 流程保持一致：ts-morph 的 rootDir 为 packages 目录
    rootDir: path.dirname(globCwd),
    outDir,
  }

  const createProgram = proxyCreateProgram(
    ts,
    ts.createProgram,
    (ts, programOptions) => {
      return [
        createVueLanguagePlugin(
          ts,
          programOptions.options,
          vueOptions,
          id => id,
        ),
      ]
    },
  )

  const host = ts.createCompilerHost(vueCompilerOptions)
  const program = createProgram({
    rootNames: [entryFile, ...typingsFiles],
    options: vueCompilerOptions,
    host,
  })

  const diagnostics = ts.getPreEmitDiagnostics(program)

  if (diagnostics.length > 0) {
    console.warn(
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: fileName => fileName,
        getCurrentDirectory: () => workRoot,
        getNewLine: () => '\n',
      }),
    )
  }

  const outputFiles: OutputFile[] = []
  program.emit(
    undefined,
    (fileName, text) => {
      // 跳过临时入口文件自身的声明
      if (path.basename(fileName) === entryBaseName) return
      outputFiles.push({
        getFilePath: () => fileName,
        getText: () => text,
      } as OutputFile)
    },
    undefined,
    true,
  )

  rmSync(entryFile, { force: true })

  return outputFiles
}
