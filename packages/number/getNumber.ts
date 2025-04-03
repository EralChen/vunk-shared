/**
 * 尝试获取数字, 如果获取失败, 则返回默认值
 */
export function getNumber (value, defaultValue = 0) {
  return Number.isNaN(value) ? defaultValue : Number(value)
}
