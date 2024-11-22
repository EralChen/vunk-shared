# copyableFencePlugin

为代码块添加复制功能

ref [vitepress](https://github.com/vuejs/vitepress/blob/1188951785fd2a72f9242d46dc55abb1effd212a/src/node/markdown/plugins/preWrapper.ts#L8)


## Usage

```ts
// vite.config.ts
import md from 'unplugin-vue-markdown/vite'
import vue from '@vitejs/plugin-vue'
import { copyableFencePlugin } from '@vunk/shared/markdown/plugins'

defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    md({
      markdownItSetup (mdit) {
        mdit.use(copyableFencePlugin)
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
    mdit.use(copyableFencePlugin)
  },
  wrapperClasses: [
    'vp-doc'
  ]
})

// main.ts
import 'vitepress/dist/client/theme-default/styles/base.css'
import 'vitepress/dist/client/theme-default/styles/vars.css'
import 'vitepress/dist/client/theme-default/styles/icons.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css'

```

:::warning
如需自定义样式，请自行实现 css
:::


## Other

代码段染色参考 [highlight](../../shiki/highlight/+Page.md)
