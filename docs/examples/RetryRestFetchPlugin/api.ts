import type { RestFetchMiddleware, RestFetchRequestOptions } from '@vunk-shared/fetch'
import type { ElementPlusRestFetchContext, ElementPlusRestFetchPluginOptions } from '@vunk-shared/fetch/ElementPlusRestFetchPlugin'
import type { RetryRestFetchContext, RetryRestFetchPluginOptions } from '@vunk-shared/fetch/RetryRestFetchPlugin'
import type { Ref } from 'vue'
import { RestFetch } from '@vunk-shared/fetch'
import { ElementPlusRestFetchPlugin } from '@vunk-shared/fetch/ElementPlusRestFetchPlugin'
import { RetryRestFetchPlugin } from '@vunk-shared/fetch/RetryRestFetchPlugin'

const restFetch = new RestFetch({
  baseURL: 'http://localhost:4545',
})

const tokenMiddleware: RestFetchMiddleware = async ({ req, res }, next) => {
  const { requestOptions } = req
  if (!requestOptions.headers) {
    requestOptions.headers = {}
  }
  const token = sessionStorage.getItem('accessToken')
    || localStorage.getItem('token')
    || localStorage.getItem('accessToken')
  if (token && !requestOptions.headers.Authorization) {
    requestOptions.headers.Authorization = token
  }

  console.log('tokenMiddleware', requestOptions)

  await next()

  await res.when().then((res) => {
    console.log('tokenMiddleware when', res)
  })
}
const rowsMiddleware: RestFetchMiddleware = async ({ res }, next) => {
  await next()
  await res.when().then((json) => {
    if (json.data?.records) {
      json.data.rows = json.data.records
    }
  })
}

restFetch.addMiddleware(tokenMiddleware)
restFetch.use(RetryRestFetchPlugin, {
  retryState: (state) => {
    if (state.retryTimes !== 0) {
      return {
        error: false,
      }
    }
  },
} as RetryRestFetchPluginOptions)

restFetch.use(ElementPlusRestFetchPlugin, {
  customOk: res => res.code === 200,
} as ElementPlusRestFetchPluginOptions)

restFetch.addMiddleware(rowsMiddleware)

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
    retryTimes: 3,
    retryDelay: 400,
    error: true,
  }).then((res) => {
    return res.data
  }).catch((_) => {
    return {
      name: 'test',
    }
  })
}
