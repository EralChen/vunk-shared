import { libExternal } from '@lib-env/build-constants'
import { rollupFiles as baseRollupFiles } from '@vunk-shared/build/rollup'
import { InputOption, InputPluginOption, OutputOptions } from 'rollup'
import { fixPath } from './alias'


export const rollupFiles = async (
  settings: {
    input: InputOption,
    external: (string|RegExp)[],
    outputDir: string,
    plugins?: InputPluginOption
    outputOptions?: OutputOptions,

    outputExtname?: string,
  },
) => {

  const outputExtname = settings.outputExtname ?? '.mjs'

  const external = settings.external ?? []

  return baseRollupFiles({
    input: settings.input,
    external: [
      ...libExternal,
      ...external,
    ],
    outputDir: settings.outputDir,
    plugins: settings.plugins,
    outputExtname,

    outputOptions: {
      paths: fixPath,
      chunkFileNames: `[name]${outputExtname}`,
      ...settings.outputOptions,
    },

  })
}
