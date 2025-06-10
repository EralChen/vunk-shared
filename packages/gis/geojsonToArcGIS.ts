import type {} from '@arcgis/core/geometry'
import type { Geometry } from 'geojson'
import { geojsonToArcGIS as _geojsonToArcGIS } from '@terraformer/arcgis'

export function geojsonToArcGIS (
  geojson: Geometry,
  idAttribute?: string,
  spatialReference?: __esri.SpatialReferenceProperties,
) {
  const data = _geojsonToArcGIS(geojson, idAttribute)
  if (spatialReference) {
    data.spatialReference = spatialReference as never
  }
  return data as __esri.GeometryProperties
}
