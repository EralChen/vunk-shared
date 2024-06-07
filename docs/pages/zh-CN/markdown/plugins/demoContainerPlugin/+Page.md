# demoContainerPlugin

添加 `demo` 块，用于展示组件的示例代码。

## dependencies

+ [element-plus](http://npmjs.com/package/element-plus)
+ [markdown-it](http://npmjs.com/package/markdown-it)
+ [markdown-it-container](http://npmjs.com/package/markdown-it-container)


## Usage

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import md from 'unplugin-vue-markdown/vite'
import { demoContainerPlugin, DemoContainerPluginSettings } from '@vunk/shared/markdown/plugins'

export default defineConfig({
  plugins: [
    md({
      markdownItSetup(mdit) {
        mdit.use(demoContainerPlugin, {
          root: path.resolve(__dirname, './src/demos'),
          globSource: '**/*.vue'
        } as DemoContainerPluginSettings)
      }
    })
  ]
})

// main.ts
import 'element-plus/dist/index.css'
```

```md

:::demo
hello/basic
>>>subs
[hello/test]
>>>
:::

```

## Other

代码段染色参考 [highlight](../../shiki/highlight/+Page.md#usage)

