import { relativeOfFile } from '../relativeOfFile'
import { expect, test } from 'vitest'


test('relativeOfFile', () => {

  const currentMdPath = `D:/labCode/vunk-shared/docs/pages/zh-CN/data/tree/toNestedTree/+Page.md`

  const filePath = `D:/labCode/vunk-shared/docs/examples/toNestedTree/basic/index.vue`



  const relativePath = relativeOfFile(currentMdPath, filePath)


  //  ..\..\..\..\..\examples\toNestedTree\basic\index.vue
  expect(relativePath.replace(/\\/g, '/'))
    .toBe(`../../../../../examples/toNestedTree/basic/index.vue`)


})


test('relativeOfFile2', () => {

  const currentMdPath = `D:/otherCode/vitepress-demo/docs/api-examples.md`

  const filePath = `D:/otherCode/vitepress-demo/docs/demos/arcgis/map.vue`



  const relativePath = relativeOfFile(currentMdPath, filePath)


  //  ..\..\..\..\..\examples\toNestedTree\basic\index.vue
  expect(relativePath.replace(/\\/g, '/'))
    .toBe(`./demos/arcgis/map.vue`)


})