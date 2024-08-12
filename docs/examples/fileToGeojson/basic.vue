<script lang="ts" setup>
import { fileToGeojson } from '@vunk-shared/gis/browser/fileToGeojson'
import { ref, shallowRef } from 'vue'
import type { FeatureCollection } from 'geojson'
import { VkJsonEditor } from '@vunk/skzz/components/json-editor'

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
      <VkJsonEditor
        class="h-full"
        :model-value="geojson"
      ></VkJsonEditor>
    </div>
  </el-dialog>
</template>
