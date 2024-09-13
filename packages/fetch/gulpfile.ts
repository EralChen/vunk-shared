import { parallel } from 'gulp'
import path from 'path'
import { globSync } from 'fast-glob'
import { distDir } from '@lib-env/path'
import { taskWithName } from '@lib-env/shared'
import { filePathIgnore } from '@lib-env/build-constants'
import { genTypes, rollupFiles } from '@lib-env/build-utils'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { esbuildPlugin } from '@vunk-shared/build/rollup/plugins'
import replace from '@rollup/plugin-replace'
import type { Plugin } from 'rollup'


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
    await rollupFiles({
      input: filePaths,
      outputDir: path.resolve(distDir, baseDirname),
      external,
      plugins: [
        nodeResolve({
          browser: true,
          preferBuiltins: false,
        }),
        esbuildPlugin,
        commonjs(),
        replace({
          preventAssignment: true,
          values: {
            'process.env.ROLLUP_BUILD': 'true',
            'process.env.NODE_DEBUG': 'false',
          },
        }) as Plugin,

      ],
    })

    await rollupFiles({
      input: filePaths,
      outputDir: path.resolve(distDir, baseDirname),
      external,
      outputExtname: '.cjs',
      outputOptions: {
        format: 'cjs',
      },
    })

  }),
  taskWithName(`gen ${baseDirname} types`, async () => {
    await genTypes({
      filesRoot: path.resolve(__dirname),
      outDir: baseDirname,
    })
  }),
)

