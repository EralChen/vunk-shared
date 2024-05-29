/**
 *  判断一个值是否是函数
 * @param thing  任意值
 * @returns 如果是函数返回true，否则返回false
 */
export function isCallable<T extends (...args: unknown[]) => unknown>(thing: T | unknown): thing is T {
  return thing instanceof Function || typeof thing === 'function'
}

