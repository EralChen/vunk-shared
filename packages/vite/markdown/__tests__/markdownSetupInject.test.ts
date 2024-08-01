import { test } from 'vitest'
import { markdownSetupInject } from '../markdownSetupInject'
import code from './toNestedTree/+Page.md?raw'


test('markdownSetupInject', async () => {
  const plugin = markdownSetupInject({
    leadingCode: [
      `import { defineAsyncComponent } from 'vue'`
    ],
    trailingCode: [
      `console.log('hello')`
    ]
  })


  const nCode: string = plugin.transform(code, 'toNestedTree/+Page.md')




})

