import { test } from 'vitest'
import { markdownSetupInject } from '../markdownSetupInject'
import { isCallable } from '@vunk-shared/function'
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
  const transformed = plugin.transform
  if (isCallable(transformed)) {
    const nCode: string = await transformed.bind(plugin)(code, 'toNestedTree/+Page.md')


    nCode
  }

})

