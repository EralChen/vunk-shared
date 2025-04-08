import type { RestFetchRequestOptions } from '@vunk-shared/fetch'
import type { ElementPlusRestFetchContext, ElementPlusRestFetchPluginOptions } from '@vunk-shared/fetch/ElementPlusRestFetchPlugin'
import { RestFetch } from '@vunk-shared/fetch'
import { ElementPlusRestFetchPlugin } from '@vunk-shared/fetch/ElementPlusRestFetchPlugin'

const restFetch = new RestFetch({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

restFetch.use(ElementPlusRestFetchPlugin, {
  customOk: res => res,
} as ElementPlusRestFetchPluginOptions)

type R<T> = T

type RestFetchRequest = <T>(
  options: RestFetchRequestOptions,
  State?: ElementPlusRestFetchContext,
  init?: RequestInit
) => Promise<R<T>>

const request: RestFetchRequest = restFetch.request.bind(restFetch)

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export function rPosts () {
  return request<Post[]>({
    method: 'GET',
    url: '/posts',
  }, {
    successMessage: true,

  })
}
