# customContainerPlugin

添加自定义块


## Usage

:::tip
我是TIP！
:::

```md
:::tip
我是TIP！
:::
```


```ts
// vite.config.ts
import md from 'unplugin-vue-markdown/vite'
import vue from '@vitejs/plugin-vue'
import { customContainerPlugin } from '@vunk/shared/markdown/plugins'


defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    md({
      markdownItSetup (mdit) {
        const containers = ['tip', 'warning', 'danger', 'info']
        containers.forEach(klass => {
          mdit.use(customContainerPlugin, klass)
        })
      },
    }),
  ]
})
```

使用 `vitepress` 样式
```ts 
// vite.config.ts
md({
  // ...
  wrapperClasses: [
    'vp-doc'
  ]
})

// main.ts
import 'vitepress/dist/client/theme-default/styles/vars.css'
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css'


```

:::warning
如需自定义样式，请自行实现 css
:::


## Source
:::source
markdown/plugins/customContainerPlugin
:::