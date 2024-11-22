# sourceContainerPlugin

添加 `source` 块, 用于展示源码。

## Usage


### Config

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import md from 'unplugin-vue-markdown/vite'
import { sourceContainerPlugin, SourceContainerPluginSettings } from '@vunk/shared/markdown/plugins'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    md({
      markdownItSetup (mdit) {
        mdit.use(sourceContainerPlugin, {
          root: path.resolve(__dirname, 'src'),
          extnames: ['.vue']
        } as SourceContainerPluginSettings)
      },
    }),
  ],
})

```

### Example

```markdown
:::source
markdown/plugins/sourceContainerPlugin
:::
```


## Source

:::source
markdown/plugins/sourceContainerPlugin
:::



## Other

代码段染色参考 [highlight](../../shiki/highlight/+Page.md)
