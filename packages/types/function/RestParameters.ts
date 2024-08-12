
/**
 * @description
 * 除了第一个参数之外的所有参数的类型
 */
export type RestParameters<T> = T extends (e: any, ...other: infer R) => any ? R : never