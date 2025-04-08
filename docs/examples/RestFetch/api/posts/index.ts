import type { Post } from './types'
import { request } from '../init'

export * from './types'

export function rPosts () {
  return request<Post[]>({
    method: 'GET',
    url: '/posts',
  })
}
