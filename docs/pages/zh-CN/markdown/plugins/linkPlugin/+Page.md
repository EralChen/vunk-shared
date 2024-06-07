# linkPlugin


1. 为超链接添加 `target="_blank"` 属性

2.  `cleanUrls: false` 可将内部链接规范化为以 `.html` 结尾，否则以空白结尾

3. 解析含有 [+Page.md](https://vike.dev/Page) 的内部链接


## Usage

### Config

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import md from 'unplugin-vue-markdown/vite'
import { linkPlugin } from '@vunk/shared/markdown/plugins'

const base ='/vunk-shared/'
// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    md({
      markdownItSetup (mdit) {
        mdit.use(linkPlugin, {
          base,
          cleanUrls: true
        })
      },
    }),
  ],
})

```

### Example


```markdown
[link](https://vike.dev/Page) - [+Page](../anchorPlugin/+Page.md)
```

[link](https://vike.dev/Page) - [+Page](../anchorPlugin/+Page.md)

