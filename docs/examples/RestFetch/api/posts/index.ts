import { request } from '../init'
import { Post } from './types'
export * from './types'

export const rPosts = () => {
  return request<Post[]>({
    method: 'GET',
    url: '/posts',
  })
}