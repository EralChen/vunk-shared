# detailsContainerPlugin

添加 `details` 块, 用于展示和隐藏内容。

## Usage

### Config

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import md from 'unplugin-vue-markdown/vite'
import { detailsContainerPlugin } from '@vunk/shared/markdown/plugins'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    md({
      markdownItSetup (mdit) {
        mdit.use(detailsContainerPlugin)
      },
    }),
  ]
})

```

### 样式

```ts
// main.ts
import 'vitepress/dist/client/theme-default/styles/vars.css'
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css'

```
:::warning
如需自定义样式，请自行实现 css
:::


### Example

```markdown
:::details summary
content
:::
```

:::details summary
content
:::