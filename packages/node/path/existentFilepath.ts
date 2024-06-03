import { extname } from 'path'
import { existsSync } from 'fs'

/**
 * @description
 * 获取文件路径，如果文件不存在则返回 null
 * @param path 路径
 * @param extnames 可能的文件后缀列表
 * @returns 文件路径或 null
 */
export function existentFilepath (
  path: string,
  extnames: string[] = ['ts', 'js'],
) {

  // 如果文件携带extname
  const ext = extname(path)
  if (ext) {
    if (extnames && !extnames.includes(ext)) {
      // eslint-disable-next-line no-console
      console.warn(
        `文件后缀名不匹配，期望 ${extnames.join(',')}，实际 ${ext}`,
      )
    }
    return existsSync(path) ? path : null
  }

  for (const ext of extnames) {
    const filepath = ext.startsWith('.') 
      ? `${path}${ext}` 
      : `${path}.${ext}`
    if (existsSync(filepath)) {
      return filepath
    }
  }

  return null


}