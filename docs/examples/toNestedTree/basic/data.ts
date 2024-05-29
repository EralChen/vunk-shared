import { FlattenedTreeNode } from '@vunk-shared/types'

interface TestTree extends FlattenedTreeNode {
  filename: string
}

export const data: TestTree[] = [
  { id: '1', pid: '0', filename: '1' },
  { id: '2', pid: '1', filename: '2' },
  { id: '3', pid: '1', filename: '3' },
  { id: '4', pid: '2', filename: '4' },
] 
