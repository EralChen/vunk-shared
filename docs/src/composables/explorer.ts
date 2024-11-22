import explorerTreeList from 'virtual:explorer'
import type { ExplorerTreeNode } from '@vunk-shared/types'
import { RouteRecordRaw } from 'vue-router'
import { toNestedTree } from '@vunk-shared/data'

type RouteRecord = RouteRecordRaw & ExplorerTreeNode

export const useExplorerRoutes = () => {
  function genRoutes (
    raws: ExplorerTreeNode[], 
  ): RouteRecord[] {
    return raws.map((menu) => {
      const path = (menu.label ?? '')
      const meta: NonNullable<RouteRecordRaw['meta']>  = {
        title: menu.label,
        alwaysShow: true,
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
