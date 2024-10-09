import { test } from 'vitest'
import { Merge } from '../Merge'

test('Merge', () => {
  type TestA = {
    a: string
    b: number
  }

  type TestB = {
    a: number
    c: boolean
  }

  type Test = Merge<TestA, TestB>
  const test: Test = { 
    // ×: Type 'string' is not assignable to type 'number'.
    // a: 'a', 

    b: 1,
    c: true,

    // √ OK
    a: 1,
  }

  console.log(test)

})

