import type { ExplorerTreeNode } from '@vunk-shared/types'
import type { RouteRecordRaw } from 'vue-router'
import { toNestedTree } from '@vunk-shared/data'
import explorerTreeList from 'virtual:explorer'

type RouteRecord = RouteRecordRaw & ExplorerTreeNode

export function useExplorerRoutes () {
  function genRoutes (
    raws: ExplorerTreeNode[],
  ): RouteRecord[] {
    return raws.map((menu) => {
      const path = menu.label ?? ''

      // 提取 menu.id 中 packages 之后的路径

      const meta: NonNullable<RouteRecordRaw['meta']> = {
        title: menu.label,
        alwaysShow: true,
        subMenuIndex: menu.id,
      }
      const route = {
        ...menu,
        path,
        meta,
        name: menu.id,
      }

      return route as RouteRecord
    })
  }
  return toNestedTree(genRoutes(explorerTreeList))
}
