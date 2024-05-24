/**
 * alias for keyof T
 */
export type Keyof<T> = T extends { 
  [s in infer K]: any
} ? K : keyof T


