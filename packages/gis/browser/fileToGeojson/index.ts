import type { FeatureCollection } from 'geojson'
import { open, Openable } from 'shapefile'
import workerUrl from 'gdal3.js/dist/package/gdal3.js?url'
import dataUrl from 'gdal3.js/dist/package/gdal3WebAssembly.data?url'
import wasmUrl from 'gdal3.js/dist/package/gdal3WebAssembly.wasm?url'
import initGdalJs from 'gdal3.js'

const paths = {
  wasm: wasmUrl,
  data: dataUrl,
  js: workerUrl,
}
const options = [ // https://gdal.org/programs/ogr2ogr.html#description
  '-f', 'GeoJSON',
]

export const fileToGeojson = (file: File) => {
  const actions = {
    shp: shpToGeojson,
    dxf: dxfToGeojson,
  }
  return new Promise<FeatureCollection>((resolve, reject) => {
    const suffix = file.name.split('.').pop()?.toLowerCase()

    if (suffix && actions[suffix]) {
      resolve(actions[suffix](file))
    } else {
      reject(new Error(`Can't resolve the .${suffix} file`))
    }
  })
}


function shpToGeojson (file: File) {
  return new Promise<FeatureCollection>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    const data: FeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    }
  
    reader.onload = function () {
      open(this.result as unknown as Openable)
        .then(source => source.read().then(
          function log (result) {
       
            if (!result.done) {
              data.features.push(result.value)
              source.read().then(log)
            } else {
              if (result.value) {
                data.features.push(result.value)
              }
              resolve(data)
            }
          },
        )).catch(reject)
    }

  })
}

function dxfToGeojson (file: File) {

  return initGdalJs({
    paths,
  }).then(gdal => {
    return Promise.all(
      [gdal.open(file), gdal] as const,
    ) 
  }).then(([res, gdal]) => {
    const dataset = res.datasets[0]
    if (!dataset) {
      throw new Error('No dataset')
    }

    return Promise.all(
      [gdal.ogr2ogr(dataset, options), gdal, dataset] as const,
    )
  }).then(([output, gdal, dataset]) => {
    return  Promise.all(
     [gdal.getFileBytes(output), gdal, dataset] as const,
    )
  }).then(([bytes, gdal, dataset]) => {
    gdal.close(dataset)
    const decoder = new TextDecoder()
    return JSON.parse(decoder.decode(bytes))
  }).then((data: FeatureCollection) => {
    return data
  })
}
 

