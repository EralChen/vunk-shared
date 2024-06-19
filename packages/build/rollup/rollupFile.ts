import { ExternalOption, InputOption, InputPluginOption, OutputOptions, rollup, RollupOptions } from 'rollup'

interface RollupFileSettings {
  input: InputOption,
  plugins: InputPluginOption


  external?: ExternalOption 


  outputFile?: string
  outputDir?: string
  outputOptions?: OutputOptions
}

export async function rollupFile (
  settings: RollupFileSettings,
) {

  const input = settings.input
  const external = settings.external
  const plugins = settings.plugins

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


