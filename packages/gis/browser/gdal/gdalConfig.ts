import type gdal from 'gdal3.js'
import { FirstParameter , NonVoidable } from '@vunk-shared/types'


/**
 * 
 * @example
 * ```ts
 * import { gdalConfig } from '@vunk-shared/gis/gdal'
   import workerUrl from 'gdal3.js/dist/package/gdal3.js?url'
   import dataUrl from 'gdal3.js/dist/package/gdal3WebAssembly.data?url'
   import wasmUrl from 'gdal3.js/dist/package/gdal3WebAssembly.wasm?url'
 * gdalConfig.paths = {
 *    wasm: wasmUrl,
      data: dataUrl,
      js: workerUrl,
 * }
 * ```
 */
export const gdalConfig:NonVoidable<FirstParameter<typeof gdal>>  = {}

