import { createFilter, FilterPattern } from '@rollup/pluginutils'
import { isCallable } from '@vunk-shared/function'
import path from 'path'
import type { GetModuleInfo, OutputAsset, OutputChunk, Plugin  } from 'rollup'


export interface CreateCssOnlyPluginSettings {
  include?: FilterPattern
  exclude?: FilterPattern

  fileName?: string

  /**
   * if `true`, the plugin will emit multiple files with entry chunk
   * @default false
   */
  multiple?: boolean

}
/**
 * @link https://github.com/thgh/rollup-plugin-css-only/blob/v4/src/index.mjs
 * @param settings 
 * @returns 
 */
export function createCssOnlyPlugin (
  settings: CreateCssOnlyPluginSettings,
): Plugin {
  const include = settings.include || ['**/*.css']
  const filter = createFilter(include, settings.exclude)
  const styles: Record<string, string> = {}
  const createCssSource = (ids: string[]) => ids
    .map(id => styles[id])
    .filter(Boolean)
    .join('\n')

  const fileName = settings.fileName ?? 'styles.css'
  let multiple = !!settings.multiple 

  // Get all CSS modules in the order that they were imported
  const getCSSModules = (
    id: string,
    getModuleInfo: GetModuleInfo, 
    modules = new Set<string>(), 
    visitedModules = new Set<string>(),
  ) => {
    if (modules.has(id) || visitedModules.has(id)) {
      return new Set<string>()
    }

    if (filter(id)) modules.add(id)

    // Prevent infinite recursion with circular dependencies
    visitedModules.add(id)

    // Recursively retrieve all of imported CSS modules
    const info = getModuleInfo(id)
    if (!info) return modules

    info.importedIds.forEach(importId => {
      modules = new Set<string>(
        [
          ...modules,
          ...getCSSModules(
            importId, 
            getModuleInfo,
            modules,
            visitedModules,
          ),
        ],
      )
    })

    return modules
  }

  return {
    name: 'css',
    transform (code, id) {


      if (!filter(id)) {
        return
      }
  
      // Keep track of every stylesheet
      // Check if it changed since last render
      // NOTE: If we are in transform block, we can assume styles[id] !== code, right?
      if (styles[id] !== code && (styles[id] || code)) {
        styles[id] = code
      }
  
      return ''
    },
    generateBundle (opts, bundle) {
      const ids = new Set<string>()


      // Determine import order of files
      for (const file in bundle) {
        const item = bundle[file]
        if (isOutputChunk(item)) {
          const root = item.facadeModuleId
          if (!root) continue
          const modules = getCSSModules(root, this.getModuleInfo)
          if (multiple && item.isEntry) {

            const css = createCssSource(Array.from(modules))

            if (
              isCallable(opts.entryFileNames) 
            ) {
              let entryFileName = opts.entryFileNames(item)

              const dirname = path.dirname(entryFileName)

              entryFileName = path.join(dirname, fileName)

              this.emitFile({ 
                type: 'asset',
                source: css + '\n', 
                fileName: entryFileName,
              })
            } else {
              // eslint-disable-next-line no-console
              console.warn(
                'entryFileNames is not a function, cannot emit multiple css files.',
              )
              multiple = false

            }


            
          }
          modules.forEach(id => ids.add(id))
        }
      }


      if (multiple) return
      
      // Combine all stylesheets, respecting import order
      const css = createCssSource(Array.from(ids))
      // Emit styles to file
      this.emitFile({ 
        type: 'asset',
        source: css + '\n', 
        fileName,
      })
    },
  }
 
}




function isOutputChunk (
  asset: OutputAsset | OutputChunk,
): asset is OutputChunk {
  return asset.type === 'chunk'
}