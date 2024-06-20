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

  /**
   * 多个输出文件时，可以通过这个字段来指定输出文件的后缀名
   * @default '.js'
   */
  outputExtname?: string
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
  let outputExtname = settings.outputExtname ?? '.js'
  if (!outputExtname.startsWith('.')) {
    outputExtname = '.' + outputExtname
  }

  const outputDir = settings.outputDir
  const outputFile = settings.outputFile


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
        return chunkInfo.name + outputExtname
      }
      const relativePath = path.relative(commonBase, currentPath)
      const ext = path.extname(relativePath)
      const name = replaceRight(relativePath, ext, outputExtname)
      return name
    }
  }

  


  const outputOptions = {
    format: 'esm',
    file: outputFile,
    dir: outputDir,
    ...computedOutputOptions,
    ...settings.outputOptions,
  } as OutputOptions


  return bundle.write(outputOptions)


}


