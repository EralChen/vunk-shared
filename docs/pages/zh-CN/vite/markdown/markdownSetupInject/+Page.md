# markdownSetupInject

向 markdown 文件注入 script setup 代码



## Useage


### vite config

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { markdownSetupInject } from '@vunk/shared/vite/markdown'
import md from 'vite-plugin-md/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    markdownSetupInject({
      trailingCode: [
        'console.log("Hello World")',
      ]
    }),
    md(),
  ],
})
```

###  transformed file

:::source
vite/markdown/\_\_tests\_\_/markdownSetupInject.test.ts
:::