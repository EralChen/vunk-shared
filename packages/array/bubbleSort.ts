import { isObject } from '@vunk-shared/object'
import { get } from 'lodash-es'

/**
 * 获取项的索引值
 * @param item - 要获取索引的项
 * @param key - 索引键名
 * @returns 索引值
 */
function getItemIndex (item: any, key: string | string[]): number | undefined {
  if (isObject(item)) {
    return get(item, key) as number
  }
  return item
}

/**
 * 跳过 undefined 的冒泡排序 (优化版)
 * @param arr - 要排序的数组
 * @param key - 排序的键 (默认为 'index')
 * @returns 排序后的数组
 */
export function bubbleSort<T> (
  arr: T[],
  key: string | string[] = 'index',
): T[] {
  if (!arr || arr.length <= 1) {
    return arr
  }

  const len = arr.length
  let swapped: boolean

  // 预处理：创建值与索引的映射，用于提高查找效率
  const indexMap = new Map<number, number>()

  for (let i = 0; i < len; i++) {
    const index = getItemIndex(arr[i], key)
    if (index !== undefined) {
      indexMap.set(i, index)
    }
  }

  // 如果没有有效的索引，直接返回原数组
  if (indexMap.size === 0) {
    return arr
  }

  for (let i = 0; i < len; i++) {
    swapped = false

    for (let j = 0; j < len - i - 1; j++) {
      const currentIndex = indexMap.get(j)

      // 如果当前项没有有效索引，跳过
      if (currentIndex === undefined) {
        continue
      }

      // 查找下一个有有效索引的项
      let nextJ = j + 1
      let nextItemIndex: number | undefined

      while (nextJ < len) {
        nextItemIndex = indexMap.get(nextJ)
        if (nextItemIndex !== undefined) {
          break
        }
        nextJ++
      }

      // 如果没有找到有效的下一项，结束本轮比较
      if (nextItemIndex === undefined) {
        break
      }

      // 如果当前值大于下一个值，交换位置
      if (currentIndex > nextItemIndex) {
        [arr[j], arr[nextJ]] = [arr[nextJ], arr[j]]

        // 更新索引映射
        indexMap.set(nextJ, currentIndex)
        indexMap.set(j, nextItemIndex)

        swapped = true
      }
    }

    // 如果本轮没有交换，说明已经排序完成
    if (!swapped) {
      break
    }
  }

  return arr
}
