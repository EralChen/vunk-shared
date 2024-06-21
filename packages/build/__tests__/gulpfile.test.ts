import path from 'path'
import { globSync } from 'fast-glob'
import { distDir } from '@lib-env/path'
import { filePathIgnore, libExternal } from '@lib-env/build-constants'
import { test } from 'vitest'
import { InputOption, InputPluginOption } from 'rollup'
import { rollupFiles as baseRollupFiles  } from '../rollup/rollupFiles'
import { fixPath } from '@lib-env/build-utils'


export const rollupFiles = async (
  settings: {
    input: InputOption,
    external: (string|RegExp)[],
    outputDir: string,
    plugins?: InputPluginOption
  },
) => {

  const external = settings.external ?? []

  return baseRollupFiles({
    input: settings.input,
    external: [
      ...libExternal,
      ...external,
    ],
    outputDir: settings.outputDir,
    plugins: settings.plugins,
    outputExtname: '.mjs',

    outputOptions: {
      paths: fixPath,
    },
    
  })
}


const buildFile = '**/index.ts'
const baseDirname = 'build'

const external = [
  'ts-morph', 
  'typescript', '@vue/compiler-sfc',
  'rollup', 

  /^@rollup\//,
  /^@vitejs\//,
  'rollup-plugin-esbuild',

]


const filePaths = globSync(buildFile, {
  cwd: path.resolve(__dirname, '../'),
  onlyFiles: true,
  absolute: true,
  ignore: filePathIgnore,
})


test('gulpfile', {
  timeout: 1000 * 60 * 5,
}, async () => {

  console.log('filePaths:', filePaths)

  await rollupFiles({
    input: [filePaths[2]],
    outputDir: path.resolve(distDir, baseDirname),
    external,
  })


})


