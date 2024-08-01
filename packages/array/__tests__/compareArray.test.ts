import { expect, test } from "vitest";
import { compareArray } from '../compareArray'

test("compareArray", async () => {

  const { addRows, deleteRows, updateRows } = compareArray(
    [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 3, name: 'c' },
    ],
    [
      { id: 2, name: 'b' },
      { id: 3, name: 'c' },
      { id: 4, name: 'd' },
    ],

    // default key is 'id'
    'id'
  )
  
  // 数组一 => 数组二, 需要添加一个 { id: 4, name: 'd' }
  // 所以 addRows 为 [{ id: 4, name: 'd' }]
  expect(addRows).toEqual([{ id: 4, name: 'd' }])

  // 数组一 => 数组二, 需要删除一个 { id: 1, name: 'a' }
  // 所以 deleteRows 为 [{ id: 1, name: 'a' }]
  expect(deleteRows).toEqual([{ id: 1, name: 'a' }])

  // 数组一 => 数组二, 有相同的 id
  // 视为数组一 => 数组二 的更新
  // 所以 updateRows 为 [{ id: 2, name: 'b' }, { id: 3, name: 'c' }]
  expect(updateRows).toEqual([{ id: 2, name: 'b' }, { id: 3, name: 'c' }])



})


test("compareBasicArray", async () => {

  const info = compareArray(
    [1, 2, 3],
    [2, 3, 4]
  )

  expect(info.addRows).toEqual([4])
  expect(info.deleteRows).toEqual([1])
  expect(info.updateRows).toEqual([2, 3])

})
