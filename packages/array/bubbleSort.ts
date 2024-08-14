import { isObject } from '@vunk-shared/object'

/**
 * 跳过 undefined 的冒泡排序
 * @param arr 
 * @param key 
 * @returns 
 */
export function bubbleSort <T> (
  arr: T[],
  key = 'index',
): T[] {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {

      let itemIndex: number = arr[j] as never

      let nextJ = j + 1
      let nextItemIndex: number = arr[nextJ] as never

      if (isObject(itemIndex)) {
        itemIndex = itemIndex[key] as number
      }

      if (isObject(nextItemIndex)) {
        nextItemIndex = nextItemIndex[key] as number
      }

      // 如果 itemIndex 为 undefined ，则忽略
      if (itemIndex === undefined) {
        continue
      }

      if (nextItemIndex === undefined) {
        nextJ++
        nextItemIndex = arr[nextJ] as never
        if (isObject(nextItemIndex)) {
          nextItemIndex = nextItemIndex[key] as number
        }
      }


      if (itemIndex > nextItemIndex) {
        [arr[j], arr[nextJ]] = [arr[nextJ], arr[j]]
      }

    }
  }
  return arr
}