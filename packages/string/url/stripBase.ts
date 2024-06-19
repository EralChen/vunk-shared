import { withTrailingSlash } from './withTrailingSlash'

/**
 * 从路径中移除指定的基础路径。如果路径与基础路径完全相同，则返回根路径 '/'。
 * 如果路径以基础路径开头，则移除基础路径及其后面的斜杠。
 * 如果路径不以基础路径开头，则返回原始路径。
 *
 * @param {string} path - 要处理的路径。
 * @param {string} base - 要移除的基础路径。
 * @returns {string} 处理后的路径，可能已经移除了基础路径。
 *
 * @example
 * ```javascript
 * stripBase('/path/to/something', '/path/to'); // 返回 '/something'
 * stripBase('/path/to', '/path/to'); // 返回 '/'
 * stripBase('/other/path', '/path/to'); // 返回 '/other/path'
 * ```
 */
export function stripBase (path: string, base: string): string {
  if (path === base) {
    return '/'
  }
  const devBase = withTrailingSlash(base)
  return path.startsWith(devBase) 
    ? path.slice(devBase.length - 1) 
    : path
}

