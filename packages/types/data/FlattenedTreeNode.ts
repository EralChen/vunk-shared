/**
 * 扁平化树节点
 *
 * @example
 * ```ts
 *
 * const nodes: FlattenedTreeNode[] = [
    { id: '1', pid: '0' },
    { id: '2', pid: '1' },
    { id: '3', pid: '1' },
    { id: '4', pid: '2' },
  ];
 * ```
 */
export interface FlattenedTreeNode {
  id: string
  pid?: string
}
