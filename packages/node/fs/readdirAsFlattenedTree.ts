import { statSync, readdirSync } from 'fs'
import { FlattenedTreeNode } from '@vunk-shared/types'
import { resolve, relative } from 'path'
import { minimatch } from 'minimatch'

export interface DirFlattenedTreeNode extends FlattenedTreeNode {
  filename: string
  isDirectory: boolean
}

export interface ReaddirAsFlattenedTreeSettings {
  ignore?: string[]
  /**
   * 是否递归
   * @default true
   */
  recursive?: boolean
}


/**
 * 读取目录 返回扁平化树
 * @param dirPath 
 * @param settings 
 * @returns - 扁平化树
 */
export function readdirAsFlattenedTree (
  dirPath: string,
  settings?: ReaddirAsFlattenedTreeSettings,
) {
  const ignore = settings?.ignore ?? []
  const recursive = settings?.recursive ?? true

  const dirFlattenedTree:DirFlattenedTreeNode[] = []
  const dirs: string[] = [dirPath]
  while (dirs.length > 0) {
    const dir = dirs.pop()
    if (!dir) {
      continue
    }
    const filenames = readdirSync(dir)

   
     
    for (const filename of filenames) {
      const id = resolve(dir, filename)
      const relativeId = relative(dirPath, id)
      const isDirectory = statSync(id).isDirectory()


      if (
        ignore.some((pattern) => minimatch(relativeId, pattern))
      ) {
        continue
      }

      dirFlattenedTree.push({
        filename,
        id,
        pid: dir,
        isDirectory,
      })

      if (isDirectory) {
        if (recursive) {
          dirs.push(id)
        }
      }
    }
  }
  return dirFlattenedTree

}
