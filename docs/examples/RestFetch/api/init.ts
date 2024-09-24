import { RestFetch, RestFetchRequest } from '@vunk-shared/fetch'

export const restFetch = new RestFetch({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

// dynamic change baseURL if needed
// restFetch.baseURL = 'https://api.example.com'



// export type R<T> =  { // 一个自定义的泛型接口
//   data: T
//   code: number
//   msg: string
// }
export type R<T> = T

/**
 * wrap restFetch.request
 */
export const request = <T>(...args: Parameters<RestFetchRequest>) => {
  const p = restFetch.request(...args) as Promise<R<T>>
  return p
}
