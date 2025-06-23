<script lang="ts" setup>
import { ref } from 'vue'
import { rName } from './api'

const data = ref('')
const loading = ref(false)
read()
function read () {
  loading.value = true
  rName(loading).then((res) => {
    data.value = res.name
    loading.value = false
  })
}
</script>

<template>
  <div v-loading="loading" h-300px>
    {{ data }}
  </div>
</template>
