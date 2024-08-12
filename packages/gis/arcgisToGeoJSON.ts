import { arcgisToGeoJSON as _arcgisToGeoJSON } from '@terraformer/arcgis'
import type {} from '@arcgis/core/geometry'

export function arcgisToGeoJSON (
  arcgis: __esri.GeometryProperties,
  idAttribute?: string,
) {
  return _arcgisToGeoJSON(arcgis, idAttribute)
}

