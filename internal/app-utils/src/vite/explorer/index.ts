
import { Plugin } from 'vite'
import { packagesDir } from '@lib-env/path'
import path from 'path'
import { readdirAsFlattenedTree, DirFlattenedTreeNode } from '@vunk-shared/node/fs'

export interface ExplorerTreeNode extends DirFlattenedTreeNode {
  /**
   * file basename
   */
  label: string
}


export interface ExplorerOptions {
  root: string
  ignore: string[]
}

export function explorerPlugin (
  options: ExplorerOptions = {
    root: packagesDir,
    ignore: [
      '**/node_modules**',
      '**/__tests__**',
    ],
  },
) {
  const virtualModulePre = 'virtual:explorer'
  
  return {
    name: 'vite-plugin-explorer',
    resolveId (id) {
      if (id.startsWith(virtualModulePre)) {
        return '\0' + id
      }
    },

    load (id) {
      if (id.startsWith('\0' + virtualModulePre)) {
        // +2 to remove '/' and '\0'
        const url = id.slice(virtualModulePre.length + 2)
        const rootdir = path.resolve(options.root, url)
        const tree = readdirAsFlattenedTree(rootdir, {
          ignore: options.ignore,
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