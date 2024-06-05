import { test } from 'vitest'



test('demoContainerPlugin', () => {
  const content = 'subs\n\\[getRootStylePropertyValue/test]'
  const subsRE = /^subs(\n|.)*\[(.+)\]/
  const m = content.match(subsRE)

  m
})
