import { expect, test } from "vitest";
import { pickObject } from '../pickObject'


test("pickObject", async () => {

  const data = {
    id: 1,
    name: 'name',
    age: 18
  }

  const result = pickObject(data, {
    excludes: ['id']
  })

  expect(result).toEqual({
    name: 'name',
    age: 18
  })

  const result2 = pickObject(data, {
    includes: ['name']
  })

  expect(result2).toEqual({
    name: 'name'
  })


  // 执行 includes 再执行 excludes，所以结果是 { name: 'name' }
  const result3 = pickObject(data, {
    includes: ['name', 'age'],
    excludes: ['age']
  })

  expect(result3).toEqual({
    name: 'name',
  })



  
})