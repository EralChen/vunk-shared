import { test } from 'vitest'
import { LinkedNode } from '@vunk-shared/types'
import { manageLinkedList } from '../manageLinkedList'
const list: LinkedNode[] = [
  { id: '3', nextId: '4' },
  { id: '4' },
  { id: '1', nextId: '2' },
  { id: '2', nextId: '3' },
  {id: '5', nextId: '6'},
  {id: '6', nextId: '7'},
  {id: '7', nextId: '8'},


]
test('manageLinkedList', () => {

   const { data } = manageLinkedList(list)

})
