<script lang="ts" setup>
import { fileToGeojson, gdalConfig } from '@vunk-shared/gis/browser/gdal'
import { ref, shallowRef } from 'vue'
import type { FeatureCollection } from 'geojson'
import workerUrl from 'gdal3.js/dist/package/gdal3.js?url'
import dataUrl from 'gdal3.js/dist/package/gdal3WebAssembly.data?url'
import wasmUrl from 'gdal3.js/dist/package/gdal3WebAssembly.wasm?url'

/* can set it in main.ts */
gdalConfig.paths = {
  data: dataUrl,
  wasm: wasmUrl,
  js: workerUrl,
}


const geojson = shallowRef<FeatureCollection>()
const dialog = ref(false)
const handleFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) {
    geojson.value = undefined
    return
  }
  fileToGeojson(file).then((v) => {
    geojson.value = v
  }).catch((e) => {
    console.error(e)
  })
}
</script>
<template>
  <input 
    type="file"
    @input="handleFile"
  >

  <button
    v-show="geojson"
    @click="dialog = true"
  >
    showdata
  </button>

  <el-dialog v-model="dialog">
    <div h-450px>
      {{  geojson }}
    </div>
  </el-dialog>
</template>
