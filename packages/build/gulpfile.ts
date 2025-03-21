import path from 'node:path'
import { filePathIgnore } from '@lib-env/build-constants'
import { genTypes, rollupFiles } from '@lib-env/build-utils'
import { distDir } from '@lib-env/path'
import { taskWithName } from '@lib-env/shared'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { globSync } from 'fast-glob'
import { parallel } from 'gulp'
import { esbuildPlugin } from './rollup/plugins'

const buildFile = '**/index.ts'
const baseDirname = __dirname.split(path.sep).pop() as string

const external = [
  'ts-morph',
  'typescript',
  '@vue/compiler-sfc',
  'rollup',

  /^@rollup\//,
  /^@vitejs\//,
  'rollup-plugin-esbuild',

  'sass',

]

const filePaths = globSync(buildFile, {
  cwd: path.resolve(__dirname, './'),
  onlyFiles: true,
  absolute: true,
  ignore: filePathIgnore,
})

export default parallel(
  taskWithName(`bundle ${baseDirname}`, async () => {
    const plugins = [
      nodeResolve({
        preferBuiltins: true,
      }),
      esbuildPlugin,
      commonjs(),
    ]

    await Promise.all([
      rollupFiles({
        input: filePaths,
        outputDir: path.resolve(distDir, baseDirname),
        external,
        plugins,
      }),

      rollupFiles({
        input: filePaths,
        outputDir: path.resolve(distDir, baseDirname),
        external,
        plugins,

        outputExtname: '.cjs',
        outputOptions: {
          format: 'cjs',
        },
      }),
    ])
  }),
  taskWithName(`gen ${baseDirname} types`, async () => {
    await genTypes({
      filesRoot: path.resolve(__dirname),
      outDir: baseDirname,
      projectEmit: true,
    })
  }),
)
