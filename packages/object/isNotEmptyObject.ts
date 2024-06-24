import { isObject } from './isObject'

export function isNotEmptyObject (obj: object): boolean {
  if (!isObject(obj)) {
    throw new TypeError('isNotEmpty() got an argment which is not object')
  }
  return Object.keys(obj).length > 0
}
