import { isObject } from './isObject'


export function isEmptyObject (obj: object): boolean {
  if (!isObject(obj)) {
    throw new TypeError('isEmpty() got an argment which is not object')
  }
  return Object.keys(obj).length === 0
}

