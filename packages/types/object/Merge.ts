
/**
 * @description
 * 合并两个对象类型，B 中的属性会覆盖 A 中的属性
 */
export type Merge<
  A extends Record<string, any>,
  B,
> = B extends Record<string, any> ? (Omit<A, keyof B> & B) : A
