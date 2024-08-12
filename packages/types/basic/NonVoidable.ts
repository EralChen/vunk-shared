/**
 * @description
 * Exclude `undefined` and `void` from `T`
 */
export type NonVoidable<T> = T extends undefined | void ? never : T

