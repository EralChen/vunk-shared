import type { RestFetchRequestOptions } from '@vunk-shared/fetch'
import type { ElementPlusRestFetchContext, ElementPlusRestFetchPluginOptions } from '@vunk-shared/fetch/ElementPlusRestFetchPlugin'
import type { RetryRestFetchContext } from '@vunk-shared/fetch/RetryRestFetchPlugin'
import type { Ref } from 'vue'
import { RestFetch } from '@vunk-shared/fetch'
import { ElementPlusRestFetchPlugin } from '@vunk-shared/fetch/ElementPlusRestFetchPlugin'
import { RetryRestFetchPlugin } from '@vunk-shared/fetch/RetryRestFetchPlugin'

const restFetch = new RestFetch({
  baseURL: 'http://localhost:4545',
})

restFetch.use(RetryRestFetchPlugin, {

})
restFetch.use(ElementPlusRestFetchPlugin, {
  customOk: res => res.code === 200,
} as ElementPlusRestFetchPluginOptions)

interface R<T> {
  code: number
  msg: string
  data: T
}

type RestFetchRequest = <T>(
  options: RestFetchRequestOptions,
  state?: ElementPlusRestFetchContext & RetryRestFetchContext,
  init?: RequestInit
) => Promise<R<T>>

const request: RestFetchRequest = restFetch.request.bind(restFetch)

export function rName (loading: Ref<boolean>) {
  return request<{ name: string }>({
    method: 'GET',
    url: '/error',
  }, {
    successMessage: true,

    loading,
    loadingDelay: 0,
    loadingClose: false,

    throwResErr: true,
    retryTimes: 1,
    error: false,
  }).then((res) => {
    return res.data
  }).catch((_) => {
    return {
      name: 'test',
    }
  })
}
