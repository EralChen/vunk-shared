
/**
 * Same as `Object.keys()` but with type inference
 * @param obj 
 * @returns  An array of the object's keys
 */
export function objectKeys<Obj extends object> (obj: Obj): Array<keyof Obj> {
  return Object.keys(obj) as Array<keyof Obj>
}


