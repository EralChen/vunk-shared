


/**
 * Same as `Object.assign()` but with type inference
 * @link https://github.com/vikejs/vike-vue/blob/main/packages/vike-vue/src/utils/objectAssign.ts
 * @param obj  The object to assign to
 * @param objAddendum  The object to assign from
 */
export function objectAssign<Obj extends object, ObjAddendum> (
  obj: Obj,
  objAddendum: ObjAddendum,
): asserts obj is Obj & ObjAddendum {
  Object.assign(obj, objAddendum)
}





