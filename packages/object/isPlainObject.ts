

export function isPlainObject (obj: any): obj is Record<string, unknown> {
  return Object.prototype.toString.call(obj) === '[object Object]' 
}

