import { test } from 'vitest'
import { toFlattenedTree } from '../toFlattenedTree'
import { NestedTreeNodeWith } from '@vunk-shared/types'


type TestNestedTree = NestedTreeNodeWith<{
  filename: string
}>


const data2: TestNestedTree[] = [
  {
    id: "1",
    filename: "1",
    children: [
      {
        id: "2",
        filename: "2",
        children: [
          {
            id: "4",
            filename: "4",
          },
        ],
      },
      {
        id: "3",
        filename: "3",
      },
    ],
  }
] 


test('toNestedTree', () => {

  const res2 = toFlattenedTree(data2)
  res2

})
