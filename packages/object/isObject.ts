

/**
 * Check if the given value is an object and not null
 * @param object  The value to check
 * @returns boolean
 */
export function isObject (object: any): object is Record<string, unknown>{
  return typeof object === 'object' && object !== null
}

