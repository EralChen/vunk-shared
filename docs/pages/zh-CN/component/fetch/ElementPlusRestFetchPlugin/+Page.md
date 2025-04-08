# ElementPlusRestFetchPlugin

ElementPlusRestFetchPlugin 是一个 RestFetch 插件，集成了 Element Plus 的 Loading 和 Message 组件，为网络请求提供加载状态和消息提示功能。

## 安装配置

```ts
import { RestFetch } from '@vunk-shared/fetch'
import { ElementPlusRestFetchPlugin } from '@vunk-shared/fetch/ElementPlusRestFetchPlugin'

const restFetch = new RestFetch({
  baseURL: 'https://api.example.com'
})

restFetch.use(ElementPlusRestFetchPlugin, {
  customOk: res => res.code === 200 // 自定义业务成功条件
})
```

## 基础用法

```ts
// 发送请求
function getPosts () {
  return request({
    method: 'GET',
    url: '/posts'
  }, {
    // 启用成功提示
    successMessage: true,
    // 启用 loading
    loading: true
  })
}
```

## 核心功能

### Loading 处理

插件默认集成了 Element Plus 的 Loading 组件:

```ts
// 基础用法
request({
  url: '/api',
  method: 'POST'
}, {
  loading: true
})

// 自定义延迟显示
request({
  url: '/api',
  method: 'POST'
}, {
  loading: true,
  loadingDelay: 300 // 300ms 后显示 loading
})

// 自定义 loading 配置
request({
  url: '/api',
  method: 'POST'
}, {
  loading: {
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  }
})

// 使用 ref 控制 loading
const loading = ref(false)
request({
  url: '/api',
  method: 'POST'
}, {
  loading
})
```

### 消息提示

集成了 Element Plus 的 Message 组件，用于显示成功/错误提示：

```ts
// 启用成功提示
request({
  url: '/api',
  method: 'POST'
}, {
  successMessage: true
})

// 自定义成功提示
request({
  url: '/api',
  method: 'POST'
}, {
  successMessage: '保存成功'
})

// 自定义错误处理
request({
  url: '/api',
  method: 'POST'
}, {
  error: true,
  onerror: (err) => {
    ElMessage.error(err.message)
  }
})
```

### 响应处理

插件提供了业务状态判断和异常处理机制：

```ts
// 自定义业务成功条件
restFetch.use(ElementPlusRestFetchPlugin, {
  customOk: (res) => {
    return res.code === 200 || res.status === 10001
  }
})

// 处理业务异常
request({
  url: '/api',
  method: 'POST'
}, {
  // 业务状态码异常时抛出错误
  throwResErr: true
})
```

## 配置项

### ElementPlusRestFetchPluginOptions

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| customOk | `(res: any) => boolean` | `res => res.code === 200` | 自定义业务成功条件 |
| onerror | `(err: any) => void` | - | 自定义错误处理函数 |

### ElementPlusRestFetchContext

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| loading | `boolean \| LoadingOptions \| Ref<boolean>` | `true` | 是否显示 loading |
| loadingDelay | `number` | 400 | loading 延迟显示时间(ms) |
| loadingClose | `boolean` | `true` | 请求完成后是否关闭 loading |
| successMessage | `boolean \| string` | `false` | 成功提示 |
| throwResErr | `boolean` | `false` | 业务异常时是否 throw 错误, 便于在后续的 catch 中处理 |
| error | `boolean` | `true` | 是否启用错误处理 |
| onerror | `(err: any) => void` | - | 错误处理函数 |
