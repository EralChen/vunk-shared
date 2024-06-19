import { ExternalOption, InputOption, InputPluginOption, OutputOptions, rollup, RollupOptions } from 'rollup'
import { createTsPlugins } from '@vunk-shared/build/rollup/plugins'

interface RollupFilesSettings {
  input: InputOption,

  /**
   * @default [...createTsPlugins()]
   */
  plugins?: InputPluginOption


  external?: ExternalOption 


  outputFile?: string
  outputDir?: string
  outputOptions?: OutputOptions
}

export async function rollupFiles (
  settings: RollupFilesSettings,
) {

  const input = settings.input
  const external = settings.external
  const plugins = settings.plugins ?? [
    ...createTsPlugins(),
  ]

  const inputConfig = {
    input,
    external,
    plugins,
    
  } as RollupOptions

  const bundle = await rollup(inputConfig)


  


  const outputOptions = {
    format: 'esm',
    file: settings.outputFile,
    dir: settings.outputDir,
    ...settings.outputOptions,
  } as OutputOptions


  return bundle.write(outputOptions)


}


