import type { MenuRaw } from '#/shared'
import type { ExplorerTreeNode } from '@vunk-shared/types'
import { toNestedTree } from '@vunk-shared/data'
import explorerTreeList from 'virtual:explorer'

export function useExplorerRoutes () {
  function genRoutes (
    raws: ExplorerTreeNode[],
  ) {
    return raws.map((menu) => {
      const route = {
        id: menu.id,
        pid: menu.pid,
        // 去除文件后缀名
        link: menu.label,
        text: menu.label,
      }

      return route as MenuRaw & ExplorerTreeNode
    })
  }
  return toNestedTree(genRoutes(explorerTreeList))
}
