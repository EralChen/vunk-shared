/**
 * 尝试获取数字, 如果获取失败, 则返回默认值
 * @param value - 要获取的值
 * @param defaultValue - 默认值 0
 * @returns - 获取到的数字
 */
export function getNumber (value, defaultValue = 0) {
  return Number.isNaN(Number(value))
    ? defaultValue
    : Number(value)
}
