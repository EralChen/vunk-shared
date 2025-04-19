import type { NormalObject } from '@vunk-shared/types'
import type { RestFetchRequestOptions } from '../RestFetch'
import { restFetch } from './restFetch'

export interface RequestResponse<T> {
  code: number
  message: string
  data: T
}

export type Request = <
  T,
  R = RequestResponse<T>,
>(
  options: RestFetchRequestOptions,
  state?: NormalObject,
  requestInit?: RequestInit,
) => Promise<R>

export const request: Request = restFetch.request.bind(restFetch)
