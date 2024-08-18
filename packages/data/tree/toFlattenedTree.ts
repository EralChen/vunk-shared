import { FlattenedTreeNode, NestedTreeNodeWith } from '@vunk-shared/types'

export function toFlattenedTree <T extends NestedTreeNodeWith> (data: T[]) {

  const res: FlattenedTreeNode[] = []

  const dfs = (
    node: NestedTreeNodeWith,
    pid?: string,
  ) => {
    const { children, ...rest } = node
    if (!rest.pid) {
      rest.pid = pid
    }
    res.push(rest)
    if (children) {
      children.forEach((v) => dfs(v, node.id))
    }
  }
  
  data.forEach((v) => dfs(v))
  return res

}
  
