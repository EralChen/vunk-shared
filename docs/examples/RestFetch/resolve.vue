<script lang="ts" setup>
import type { NormalObject } from '@vunk/core'
import { RestFetch } from '@vunk-shared/fetch'
import { ElementPlusRestFetchPlugin } from '@vunk-shared/fetch/ElementPlusRestFetchPlugin'
import { ref } from 'vue'

const restFetch = new RestFetch({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

restFetch.presetRequestInit = (config) => {
  const headers = config.headers as Headers
  headers.set('X-Preset-Header', 'PresetValue')
  return config
}
restFetch.use(ElementPlusRestFetchPlugin)

restFetch.addMiddleware(async (ctx, next) => {
  ctx.req.requestOptions.headers = {
    ...ctx.req.requestOptions.headers,
    'X-Custom-Header2': 'CustomValue2',
  }
  await next()
})

restFetch.addMiddleware(async (ctx, next) => {
  ctx.req.requestOptions.headers = {
    ...ctx.req.requestOptions.headers,
    'X-Custom-Header': 'CustomValue',
  }
  await next()
})

const data = ref({})

read()
async function read () {
  restFetch.resolve({
    url: '/posts/1',
    method: 'GET',
  }).then(([_a, _b, config]) => {
    const headers = config.headers as Headers
    const obj: NormalObject = {}
    headers.forEach((value, key) => {
      obj[key] = value
    })
    data.value = obj
    // eslint-disable-next-line no-console
    console.log('Response Headers:', obj)
  })
}
</script>

<template>
  <div>{{ data }}</div>
</template>
