<script lang="ts" setup>
import { ref } from 'vue'
import { rTestStream } from './api/stream'
import { RestFetchReaderOnmessage } from '@vunk-shared/fetch'


const data = ref<string>('')

const onmessage: RestFetchReaderOnmessage = (e) => {
  if (e.type === 'event') {
    data.value += e.data
  } 
  console.log(e) 
}
read()
function read () {
  return rTestStream(onmessage)
}
</script>
<template>
  <div>{{ data }}</div>
</template>
