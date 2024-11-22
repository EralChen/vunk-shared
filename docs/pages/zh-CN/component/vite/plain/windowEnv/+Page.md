# windowEnv

 将 VITE_ 环境变量  挂载到 window 上

## Usage


```ts
// vite.config.ts
import { windowEnv } from '@vunk/shared/vite/plain'

// defineConfig
plugins:[
  vue(),
  windowEnv(),
]
```

```html
<!-- 添加 <script id="env"></script> 标签 -->
<body>
  <div id="app"></div>
  <script id="env"></script>
  <script type="module" src="/src/main.ts"></script>
</body>
```

```html
<!-- dist html -->
<body>
  <div id="app"></div>
  <script id="env">
      window.__env__ = {
        // VITE_ 环境变量 
        "VITE_TEST": "/zz/scene-server"
      }
  </script>
</body>
```


## source

:::source
vite/basic/windowEnv
:::
