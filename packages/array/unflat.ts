/**
 * 根据指定大小将数组拆分为多个数组
 * @param data array
 * @param size  number
 */
export function unflat <T extends {
  slice: (start: number, end: number) => T
  length: number
}> (data: T, size: number): T[] {
  return Array.from(
    { length: Math.ceil(data.length / size) },
    (_, i) => data.slice(i * size, (i + 1) * size),
  )
}
