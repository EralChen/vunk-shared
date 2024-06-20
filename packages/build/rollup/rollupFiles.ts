import { ExternalOption, InputOption, InputPluginOption, OutputOptions, rollup, RollupOptions } from 'rollup'
import { createTsPlugins } from '@vunk-shared/build/rollup/plugins'
import { commonBasepath } from '@vunk-shared/node/path'
import path from 'path'
import { replaceRight } from '@vunk-shared/string'


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


  const computedOutputOptions:Pick<OutputOptions, 'entryFileNames'> = {}
  
  if (Array.isArray(input)) { // multiple inputs
    const commonBase = commonBasepath(input)
    computedOutputOptions.entryFileNames = function (chunkInfo) {
      const currentPath = chunkInfo.facadeModuleId
      if (!currentPath) {
        return chunkInfo.name + '.js'
      }
      const relativePath = path.relative(commonBase, currentPath)
      const ext = path.extname(relativePath)
      const name = replaceRight(relativePath, ext, '.js')
      return name
    }
  }

  


  const outputOptions = {
    format: 'esm',
    file: settings.outputFile,
    dir: settings.outputDir,
    ...computedOutputOptions,
    ...settings.outputOptions,
  } as OutputOptions


  return bundle.write(outputOptions)


}


