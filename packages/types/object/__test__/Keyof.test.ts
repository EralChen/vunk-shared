import { Keyof } from '../Keyof'
import { NormalObject } from '../NormalObject'
import { test } from 'vitest'

function testA <
  T extends NormalObject,
  K extends Keyof<T>
> () {
  // √ OK
  return '' as Capitalize<K>
}

function testB <
  T extends NormalObject,
  K extends keyof T
> () {
  // ×: Type 'string | number | symbol' is not assignable to type 'string'.
  return '' as Capitalize<K>
}

test('Keyof pass', () => {
  testA()
  testB()  
})

