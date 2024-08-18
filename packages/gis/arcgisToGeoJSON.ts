import { arcgisToGeoJSON as _arcgisToGeoJSON } from '@terraformer/arcgis'
import type {} from '@arcgis/core/geometry'

export function arcgisToGeoJSON (
  arcgis: __esri.GeometryProperties | __esri.GraphicProperties,
  idAttribute?: string,
) {
  return _arcgisToGeoJSON(
    arcgis as __esri.GeometryProperties, 
    idAttribute,
  )
}

