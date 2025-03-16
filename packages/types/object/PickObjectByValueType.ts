
/**
 * Pick keys of object by value type
 * @example 
 * type Obj = { a: 1, b: '2', c: 3 }
 * type Result = PickObjectByValueType<Obj, number> // { a: 1, c: 3 }
 */
export type PickObjectByValueType<Obj, ValueType> = {
  [K in keyof Obj as Obj[K] extends ValueType ? K : never]: Obj[K];
};

