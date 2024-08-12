import { AnyFunc } from './AnyFunc'

/**
 * @description
 * 函数的第一个参数的类型
 */
export type FirstParameter<T extends AnyFunc> = Parameters<T>[0]

