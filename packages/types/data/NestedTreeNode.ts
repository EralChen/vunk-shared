
/**
 * 嵌套结构树节点
 * @example
 * ```ts
 * const nodes: NestedTreeNode[] = [
    { 
      id: '1', 
      children: [
        { 
          id: '2', 
          children: [
            { id: '4' },
          ]
        },
        { id: '3' },
      ] 
    },
  ];
  ```
 */
export interface NestedTreeNode {
  id: string
  pid?: string
  children?: NestedTreeNode[]
}


