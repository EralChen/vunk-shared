# anchorPlugin

用于在 Markdown 文档中为标题自动生成锚点和链接

ref [vitepress](https://github.com/vuejs/vitepress/blob/b2fa9326c727170d127d950971480b6d9f6bb82d/src/node/markdown/markdown.ts#L245)

## dependencies

+ [markdown-it](http://npm.im/markdown-it)
+ [markdown-it-anchor](http://npm.im/markdown-it-anchor)

## Usage

```ts
// vite.config.ts
import md from 'unplugin-vue-markdown/vite'
import vue from '@vitejs/plugin-vue'
import { anchorPlugin } from '@vunk/shared/markdown/plugins/anchorPlugin'
defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    md({
      markdownItSetup (mdit) {
        mdit.use(anchorPlugin)
      }
    }),
  ]
})
```

使用 `vitepress` 样式
```ts 
// vite.config.ts
md({
  markdownItSetup (mdit) {
    mdit.use(anchorPlugin)
  },
  wrapperClasses: [
    'vp-doc'
  ]
})

// main.ts
import 'vitepress/dist/client/theme-default/styles/vars.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css'
```

:::warning
如需自定义样式，请自行实现 css
:::


## Source

:::source
markdown/plugins/anchorPlugin/index
:::
