import { geojsonToArcGIS as _geojsonToArcGIS } from '@terraformer/arcgis'
import { Geometry } from 'geojson'
import type {} from '@arcgis/core/geometry'



export function geojsonToArcGIS (
  geojson: Geometry,
  idAttribute?: string,
  spatialReference?: __esri.SpatialReferenceProperties,
) {
  const data = _geojsonToArcGIS(geojson, idAttribute)
  if (spatialReference) {
    data.spatialReference = spatialReference
  }
  return data as __esri.GeometryProperties
}

