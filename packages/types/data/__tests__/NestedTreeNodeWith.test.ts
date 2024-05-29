import { test } from "vitest";
import { NestedTreeNodeWith } from '../NestedTreeNodeWith'
type TestTree = NestedTreeNodeWith<{
  filename: string
}>

test('NestedTreeNodeWith', () => {
  const nodes: TestTree[] = [
    {
      id: '1', 
      filename: '1',
      children: [
        { 
          id: '2', 
          filename: '2',
          children: [
            { id: '4', filename: '4' },
          ]
        },
        { id: '3', filename: '3' },
      ]
    }
  ]
  
})