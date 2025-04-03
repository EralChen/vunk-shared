import { getNumber } from './getNumber'

/**
 * 尝试获取数字, 如果获取失败, 则返回 undefined
 */
export function getPartialNumber (value): number | undefined {
  return Number.isNaN(Number(value))
    ? undefined
    : Number(value)
}
