import { parallel } from 'gulp'
import path from 'path'
import { globSync } from 'fast-glob'
import { distDir } from '@lib-env/path'
import { taskWithName } from '@lib-env/shared'
import { filePathIgnore } from '@lib-env/build-constants'
import { genTypes, rollupFiles } from '@lib-env/build-utils'
import { CompilerOptions, ModuleResolutionKind, ModuleKind } from 'ts-morph'

const buildFile = '**/index.ts'
const baseDirname = __dirname.split(path.sep).pop() as string
const external = [
  /^win32-api/,
  /^win32-def/,
]

const filePaths = globSync(buildFile, {
  cwd: path.resolve(__dirname, './'),
  onlyFiles: true,
  absolute: true,
  ignore: filePathIgnore,
})

export default parallel(
  taskWithName(`bundle ${baseDirname}`, async () => {
    await rollupFiles({
      input: filePaths,
      outputDir: path.resolve(distDir, baseDirname),
      external,
    })
  }),
  taskWithName(`gen ${baseDirname} types`, async () => {

    const compilerOptions: CompilerOptions = {
      moduleResolution: ModuleResolutionKind.NodeNext,
      module: ModuleKind.NodeNext,
      skipLibCheck: true,
    }
    await genTypes({
      filesRoot: path.resolve(__dirname),
      outDir: baseDirname,
      compilerOptions,
    })
  }),
)

