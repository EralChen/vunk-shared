import { parallel } from 'gulp'
import path from 'path'
import { globSync } from 'fast-glob'
import { distDir } from '@lib-env/path'
import { taskWithName } from '@lib-env/shared'
import { filePathIgnore } from '@lib-env/build-constants'
import { genTypes, rollupFiles } from '@lib-env/build-utils'

const buildFile = '**/index.ts'
const baseDirname = __dirname.split(path.sep).pop() as string
const external = []

const filePaths = globSync(buildFile, {
  cwd: path.resolve(__dirname, './'),
  onlyFiles: true,
  absolute: true,
  ignore: filePathIgnore,
})

export default parallel(
  taskWithName(`bundle ${baseDirname}`, async () => {
    await Promise.all(
      [
        rollupFiles({
          input: filePaths,
          outputDir: path.resolve(distDir, baseDirname),
          external,
        }),
        rollupFiles({
          input: filePaths,
          outputDir: path.resolve(distDir, baseDirname),
          external,

          outputExtname: '.cjs',
          outputOptions: {
            format: 'cjs',
          },

        }),
      ],
    )
  }),
  taskWithName(`gen ${baseDirname} types`, async () => {
    await genTypes({
      filesRoot: path.resolve(__dirname),
      outDir: baseDirname,
    })
  }),
)

