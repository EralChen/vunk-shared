import { test } from 'vitest'
import { toNestedTree } from '../toNestedTree'
import { FlattenedTreeNode } from '@vunk-shared/types'


interface TestTree extends FlattenedTreeNode {
  filename: string
}

const data: TestTree[] = [
  { id: '1', pid: '0', filename: '1' },
  { id: '2', pid: '1', filename: '2' },
  { id: '3', pid: '1', filename: '3' },
  { id: '4', pid: '2', filename: '4' },
] 


test('toNestedTree', () => {
  const res = toNestedTree(data)
  res
})
