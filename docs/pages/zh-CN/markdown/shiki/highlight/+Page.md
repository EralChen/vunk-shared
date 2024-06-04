# highlight


给代码块添加高亮。

https://github1s.com/vuejs/vitepress/blob/main/src/node/markdown/plugins/highlight.ts


## dependencies

+ [shiki](http://npmjs.com/package/shiki)

## basic

:::demo
highlight/basic
:::





## Usage

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import md from 'unplugin-vue-markdown/vite'
import { highlight } from '@vunk/shared/markdown/shiki'

export default defineConfig({
  plugins: [
    md({
      markdownItOptions: {
        highlight: (await highlight({
          dark: 'github-dark',
          light: 'github-light',
        }, {})),
      },
    })
  ]
})
```


使用 `vitepress` 样式

```ts
// main.ts
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
```

:::warning
如需自定义样式，请自行实现 css
:::
