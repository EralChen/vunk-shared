import { test } from 'vitest'



test('demoContainerPlugin', () => {
  const content = 'subs\n\\[getRootStylePropertyValue/test]'
  const subsRE = /^subs(\n|.)*\[(.+)\]/
  const m = content.match(subsRE)

  m
})


test('demoContainerPlugin', () => {
  const content = '\\[getRootStylePropertyValue/test]\\'
  // 获取 [] 中的内容
  const subsRE = /\[(.*?)\]/g
  const m = content.matchAll(subsRE)

  const inner = m.next().value


  inner

})
