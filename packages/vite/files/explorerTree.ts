
import type { Plugin } from 'vite'
import path from 'node:path'
import { readdirAsFlattenedTree, DirFlattenedTreeNode } from '@vunk-shared/node/fs'

export interface ExplorerTreeNode extends DirFlattenedTreeNode {
  /**
   * file basename
   */
  label: string
}


export interface ExplorerTreeSettings {
  root?: string
  ignore?: string[]
}


/**
 * 获取文件目录树
 * @param settings 
 * @param settings.root - root directory
 * @param settings.ignore - ignore files
 * @returns 
 * 
 * @example
 * ```ts
 import explorerTreeList from 'virtual:explorer/packages'
  console.log(explorerTreeList)
 * ```
 */
export function explorerTree (
  settings?: ExplorerTreeSettings,
) {

  const root = settings?.root || process.cwd()
  const ignore = settings?.ignore || []
  
  const virtualModulePre = 'virtual:explorer'
  
  return {
    name: 'vite-plugin-explorer-tree',
    resolveId (id) {
      if (id.startsWith(virtualModulePre)) {
        return '\0' + id
      }
    },

    load (id) {
      if (id.startsWith('\0' + virtualModulePre)) {
        // +2 to remove '/' and '\0'
        const url = id.slice(virtualModulePre.length + 2)
        const rootdir = path.resolve(root, url)
        const tree = readdirAsFlattenedTree(rootdir, {
          ignore: ignore,
        }).map(item => {
          return {
            ...item,
            // 去掉文件后缀
            label: item.filename.replace(/\.[^/.]+$/, ''),
          } as ExplorerTreeNode
        })
        return `export default ${JSON.stringify(tree)}`
      }
    },

  } as Plugin

}