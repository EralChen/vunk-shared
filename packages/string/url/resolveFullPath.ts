import { withoutTrailingSlash } from './withoutTrailingSlash'


/**
 * 解析完整路径
 * 如果 path 以斜杠开头，则直接返回 path，否则将 path 与 base 拼接
 */
export function resolveFullPath (
  path: string, base: string,
): string { 
  path = withoutTrailingSlash(path)
  base = withoutTrailingSlash(base)

  const nPath = path.startsWith('/') 
    ? path 
    : `${base}${path ? '/' : ''}${path}`

  return nPath
}
