import { AnyFunc } from '@vunk-shared/types'

/**
 * 给函数添加displayName属性
 * @param displayName  函数名
 * @param fn 函数
 * @returns 
 */
export const gulpTask = <T extends AnyFunc>(displayName: string, fn:T):T => {
  return Object.assign(fn, {
    displayName,
  })
}
