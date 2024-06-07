# createMarkdownPlugin

创建集大成的 Markdown 插件。


## dependencies

+ [markdown-it](https://www.npmjs.com/package/markdown-it)
+ [markdown-it-anchor](https://www.npmjs.com/package/markdown-it-anchor)
+ [markdown-it-container](https://www.npmjs.com/package/markdown-it-container)
+ [unplugin-vue-markdown](https://www.npmjs.com/package/unplugin-vue-markdown)
+ [element-plus](https://www.npmjs.com/package/element-plus)
+ [vitepress](https://www.npmjs.com/package/vitepress)


## Usage

### vite config


```ts
// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createMarkdownPlugin } from '@vunk/shared/vite/markdown'
import { loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) =>{ 

  const env = loadEnv(mode, process.cwd())
  const base = env.VITE_BASE_URL ?? '' + '/'

   return {
    base,
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/]
      }),
      await createMarkdownPlugin({
        base,
        demoContainerPluginSettings: {
          root: fileURLToPath(new URL('./src/demos', import.meta.url)),
          globSource: '**/*.vue',
        },
        sourceContainerPluginSettings: {
          root: fileURLToPath(new URL('./src', import.meta.url)),
        }
      }),
    ],
  }
})

```

#### 样式导入

```ts
import 'element-plus/dist/index.css'
import 'vitepress/dist/client/theme-default/styles/vars.css'
import 'vitepress/dist/client/theme-default/styles/base.css'
import 'vitepress/dist/client/theme-default/styles/icons.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css'
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
```

#### 使用

App.vue

```vue
<script lang="ts" setup>
import Page from './components/Page.md'
</script>
<template>
  <div class="app-page-x">
    <Page></Page>
  </div>
</template>
<style>
.app-page-x{
  margin: 0 5em;
}
</style>
```

Page.md

```md
# Page

This is a page component.


## demo

:::demo
Test
:::


## source

:::source
demos/Test
:::
```


## Source

:::source
vite/markdown/createMarkdownPlugin
:::
