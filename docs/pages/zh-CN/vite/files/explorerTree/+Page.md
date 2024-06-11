# explorerTree

获取文件目录树


## Usage

### 配置

```ts
// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { explorerTree } from '@vunk/shared/vite/files'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    explorerTree({
      root: fileURLToPath(new URL('./src', import.meta.url)),
      ignore: [
        'assets', // (or 'assets**') ignore assets folder and its contents
        // 'assets/**', ignore assets folder's contents only
      ]
    }),
  ]
})

```

### 类型定义

```ts
// .d.ts, 可以写入到 env.d.ts 或者项目中的其他 .d.ts 文件中
declare module 'virtual:explorer*' {
  import type { ExplorerTreeNode } from '@vunk/shared/types'
  const tree: ExplorerTreeNode[]
  export default tree
}

```

### 使用

```vue
<script lang="ts" setup>
import explorerTreeList from 'virtual:explorer'
// import componentsExplorer from 'virtual:explorer/components'
</script>
<template>
  <div class="app-page-x">
    <ul>
      <li v-for="item in explorerTreeList">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

```

```txt
{ "filename": "App.vue", "id": "D:\\labCode\\vunk-shared-play\\src\\App.vue", "pid": "D:\\labCode\\vunk-shared-play\\src", "isDirectory": false, "label": "App" }
{ "filename": "components", "id": "D:\\labCode\\vunk-shared-play\\src\\components", "pid": "D:\\labCode\\vunk-shared-play\\src", "isDirectory": true, "label": "components" }
{ "filename": "main.ts", "id": "D:\\labCode\\vunk-shared-play\\src\\main.ts", "pid": "D:\\labCode\\vunk-shared-play\\src", "isDirectory": false, "label": "main" }
{ "filename": "Page.md", "id": "D:\\labCode\\vunk-shared-play\\src\\components\\Page.md", "pid": "D:\\labCode\\vunk-shared-play\\src\\components", "isDirectory": false, "label": "Page" }
```

## Source

:::source
vite/files/explorerTree
:::
