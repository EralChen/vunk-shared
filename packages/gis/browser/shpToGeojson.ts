import { FeatureCollection } from 'geojson'
import { open, Openable } from 'shapefile'

export function shpToGeojson (file: File) {
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

