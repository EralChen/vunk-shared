import { test } from "vitest";
import { compareArray } from '../compareArray'

test("compareArray", async () => {

  const info = compareArray(
    [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 3, name: 'c' },
    ],
    [
      { id: 2, name: 'b' },
      { id: 3, name: 'c' },
      { id: 4, name: 'd' },
    ]
  )


  info

})


test("compareBasicArray", async () => {

  const info = compareArray(
    [1, 2, 3],
    [2, 3, 4]
  )


  info

})
