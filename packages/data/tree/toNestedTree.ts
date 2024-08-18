import { FlattenedTreeNode, NestedTreeNodeWith } from '@vunk-shared/types'


/**
 * 将扁平化树转换为嵌套树
 * @param data  扁平化树
 * @returns 嵌套树
 * @example
 *  interface TestTree extends FlattenedTreeNode {
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
      console.log(res)
    })

 */
export function toNestedTree <T extends FlattenedTreeNode> (data: T[]) { 
  
  const res: NestedTreeNodeWith<T>[] = []

  // 构建一个有序的map
  const map = data.reduce(
    (pre, cur) => (
      (
        pre.set(cur.id, { ...cur })
      ),
      pre),
    new Map<string, NestedTreeNodeWith<T>>(),
  )


  for (const [, item] of map) { // 遍历 map
    const parent = map.get(item.pid || '')
    // 储存顶级item
    if (!parent) {
      res.push(item)
    } else {
      parent.children = parent.children || []
      parent.children.push(item)
    }
  }

  return res
}

