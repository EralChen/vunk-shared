import { NormalObject } from '@vunk-shared/types/object'

/**
 * 嵌套结构树节点
 * @example
 * ```ts
 * type TestTree = NestedTreeNodeWith<{
    filename: string
  }>
 * const nodes: TestTree[] = [
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
  ```
 */
export type NestedTreeNodeWith<T = NormalObject> = T & {
  id: string
  pid?: string
  children?: NestedTreeNodeWith<T>[]
}


