
/**
 * 若路径以斜杠结尾，则移除斜杠。
 */
export function withoutTrailingSlash (path: string): string {
  if (path[path.length - 1] === '/') {
    return path.slice(0, -1)
  }
  return path
}

