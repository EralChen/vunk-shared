/**
 * @description 正则匹配外部链接
 * 
 * @example
 * ```ts
 * externalUrlRE.test('https://www.baidu.com') // true
 * ```
 */
export const externalUrlRE = /^(?:[a-z]+:|\/\/)/i
