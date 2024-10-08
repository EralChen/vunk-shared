/**
 * @description
 * 选择指定的属性，并将其变为必选
 * @example
 * type Foo = {
 *  a?: string
 *  b?: number
 * }
 * type Bar = MakeRequired<Foo, 'a'> // { a: string, b?: number }
 * 
 */
export type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
