import { isObject } from '@vunk-shared/object'

/**
 * 比较两个对象数组，返回新增、删除、更新的元素
 * @param ov 
 * @param v 
 * @param key 
 * @returns 
 */
export function compareArray<T> (
  ov: T[], 
  v: T[], 
  key = 'id',
) {
  const updateRows: T[] = []
  const addMap = v.reduce((a, c) => {
    const id = (isObject(c) ? c[key] : c) as string | number
    a.set(id, c)
    return a
  }, new Map<string|number, T>())

  const deleteMap = ov.reduce((a, c) => {
    const id = (isObject(c) ? c[key] : c) as string | number
    if (addMap.has(id)) {
      updateRows.push(c)
      addMap.delete(id)
    } else {
      a.set(id, c)
    }
    return a
  }, new Map<string | number, T>())


  const add: T[] = [...addMap.values()]
  const del: T[] = [...deleteMap.values()]

  return {
    addMap,
    deleteMap,
    updateRows,
    
    addRows: add,
    deleteRows: del,
  }
}



