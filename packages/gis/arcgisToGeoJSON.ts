import type {} from '@arcgis/core/geometry'
import { arcgisToGeoJSON as _arcgisToGeoJSON } from '@terraformer/arcgis'

export function arcgisToGeoJSON (
  arcgis: __esri.GeometryProperties | __esri.GraphicProperties,
  idAttribute?: string,
) {
  return _arcgisToGeoJSON(
    arcgis as never,
    idAttribute,
  )
}
