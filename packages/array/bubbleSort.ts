import { isObject } from '@vunk-shared/object'
import { get } from 'lodash-es'

/**
 * 跳过 undefined 的冒泡排序
 * @param arr
 * @param key
 * @returns
 */
export function bubbleSort<T> (
  arr: T[],
  key: string | string[] = 'index',
): T[] {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      let itemIndex: number = arr[j] as never

      let nextJ = j + 1
      let nextItemIndex: number = arr[nextJ] as never

      if (isObject(itemIndex)) {
        itemIndex = get(itemIndex, key) as number
      }

      if (isObject(nextItemIndex)) {
        nextItemIndex = get(nextItemIndex, key) as number
      }

      // 如果 itemIndex 为 undefined ，则忽略
      if (itemIndex === undefined) {
        continue
      }

      // 如果 nextItemIndex 为 undefined，继续向前查找非 undefined 的值
      if (nextItemIndex === undefined) {
        // 持续查找直到找到非 undefined 值或达到数组末尾
        while (nextJ < len - 1) {
          nextJ++
          nextItemIndex = arr[nextJ] as never
          if (isObject(nextItemIndex)) {
            nextItemIndex = get(nextItemIndex, key) as number
          }
          // 找到非 undefined 值后退出循环
          if (nextItemIndex !== undefined) {
            break
          }
        }

        // 如果所有后续项都是 undefined，则跳过当前比较
        if (nextItemIndex === undefined) {
          continue
        }
      }

      if (itemIndex > nextItemIndex) {
        [arr[j], arr[nextJ]] = [arr[nextJ], arr[j]]
      }
    }
  }
  return arr
}
