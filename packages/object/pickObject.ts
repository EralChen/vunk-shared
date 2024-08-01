import { NormalObject } from '@vunk-shared/types'

/**
 * 从对象中提取指定的属性
 * @param data  数据
 * @param opts 
 * @param opts.excludes 排除的属性
 * @param opts.includes 包含的属性
 * @returns 返回一个新的对象
 */
export const pickObject = <
  T extends NormalObject, 
  EX extends (keyof T)[] | undefined,
  KI extends keyof T,
>(
    data: T, 
    opts: {
      excludes?: EX
      includes?: KI[]
    } = {},
  ) => {

  let _data = {} as Partial<T>
  if (opts.includes) {
    opts.includes.forEach(k => {
      _data[k] = data[k]
    }) 
  } else {
    _data = { ...data }
  }

  if (opts.excludes) {
    opts.excludes.forEach(key => {
      Reflect.deleteProperty(_data, key)
    })
  }


  return _data as {
    [
      P in 
      EX extends Array<infer KE> // 如果有 EX
       ? Exclude<KI, KE> : 
       KI // 如果 没有
    ]: T[P]
  }
}
