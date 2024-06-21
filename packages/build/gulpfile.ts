import { parallel } from 'gulp'
import path from 'path'
import { globSync } from 'fast-glob'
import { distDir } from '@lib-env/path'
import { taskWithName } from '@lib-env/shared'
import { filePathIgnore } from '@lib-env/build-constants'
import { genTypes, rollupFiles } from '@lib-env/build-utils'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { esbuildPlugin } from './rollup/plugins'
import commonjs from '@rollup/plugin-commonjs'

const buildFile = '**/index.ts'
const baseDirname = __dirname.split(path.sep).pop() as string

const external = [
  'ts-morph', 
  'typescript', '@vue/compiler-sfc',
  'rollup', 

  /^@rollup\//,
  /^@vitejs\//,
  'rollup-plugin-esbuild',

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
      plugins: [
        nodeResolve(),
        esbuildPlugin,
        commonjs(),
      ],
    })
  }),
  taskWithName(`gen ${baseDirname} types`, async () => {
    await genTypes({
      filesRoot: path.resolve(__dirname),
      outDir: baseDirname,
    })
  }),
)


