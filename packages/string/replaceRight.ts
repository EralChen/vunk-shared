/**
 * 在字符串中右侧替换最后一个匹配项。
 * @param {string} input - 要替换的输入字符串。
 * @param {string} searchValue - 要搜索并替换的子字符串。
 * @param {string} replaceValue - 用于替换的新字符串。
 * @returns {string} 替换后的字符串。
 */
export function replaceRight (
  input: string,
  searchValue: string, 
  replaceValue: string,
) {
  const lastIndex = input.lastIndexOf(searchValue)
  if (lastIndex === -1) {
    return input
  }
  const before = input.substring(0, lastIndex)
  const after = input.substring(lastIndex + searchValue.length)
  return before + replaceValue + after
}
