import type { FeatureCollection } from 'geojson'
import initGdalJs from 'gdal3.js'
import { gdalConfig } from '@vunk-shared/gis/browser/gdal'
import { shpToGeojson } from '@vunk-shared/gis/browser'

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

function dxfToGeojson (file: File) {

  return initGdalJs(gdalConfig).then(gdal => {
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
 

