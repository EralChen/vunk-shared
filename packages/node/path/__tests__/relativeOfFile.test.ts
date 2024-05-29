import { relativeOfFile } from '../relativeOfFile'
import { expect, test } from 'vitest'

const currentMdPath = `D:/labCode/vunk-shared/docs/pages/zh-CN/data/tree/toNestedTree/+Page.md`

const filePath = `D:/labCode/vunk-shared/docs/examples/toNestedTree/basic/index.vue`


test('relativeOfFile', () => {
  const relativePath = relativeOfFile(currentMdPath, filePath)


  //  ..\..\..\..\..\examples\toNestedTree\basic\index.vue
  expect(relativePath.replace(/\\/g, '/'))
    .toBe(`../../../../../examples/toNestedTree/basic/index.vue`)


})