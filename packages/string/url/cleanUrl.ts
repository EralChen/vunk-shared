
const postfixRE = /[?#].*$/

/**
 * 清理 URL，删除 URL 中的查询参数和哈希值。
 * @param url 
 * @returns cleaned URL
 */
export function cleanUrl (url: string): string {
  return url.replace(postfixRE, '')
}

