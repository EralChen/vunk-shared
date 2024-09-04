
/**
 * 若路径不以斜杠结尾，则添加斜杠。
 * @param path 
 * @returns 
 */
export function withTrailingSlash (path: string): string {
  if (path[path.length - 1] !== '/') {
    return `${path}/`
  }
  return path
}


