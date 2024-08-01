import { LinkedNode } from './LinkedNode'


export interface LinkedNodeInfo<T extends LinkedNode = LinkedNode> {
  id: string
  prevId: string
  nextId: string


  startId: string
  endId: string

  raw: T

  /**
   * 是否循环
   */
  isCycle: boolean
}


