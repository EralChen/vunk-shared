# RestFetch

RestFetch 是一个功能强大的 HTTP 客户端封装，基于浏览器原生的 fetch API 实现。它提供了请求拦截、响应拦截、请求队列、缓存、超时处理等丰富功能。

## 基础用法

### 创建实例

```typescript
import { RestFetch } from '@vunk/shared/fetch'

const client = new RestFetch({
  baseURL: 'https://api.example.com',
  timeout: 5000, // 5 秒超时
})
```

### 发送请求

```typescript
// GET 请求
await client.request({
  method: 'GET',
  url: '/users',
  params: { page: 1 }
})

// POST 请求
await client.request({
  method: 'POST',
  url: '/users',
  data: {
    name: 'John',
    email: 'john@example.com'
  }
})
```

## 高级特性

### 中间件

中间件提供了一种强大的方式来处理请求和响应。每个中间件可以访问请求上下文、响应数据，并决定是否调用下一个中间件。

```typescript
// 添加时间戳中间件
client.addMiddleware(async (ctx, next) => {
  // 修改请求参数
  ctx.req.requestOptions.params = {
    ...ctx.req.requestOptions.params,
    startTime: Date.now(),
  }

  // 调用下一个中间件
  await next()

  // 处理响应数据
  const data = await ctx.res.when()

  if (data) {
    ctx.body = {
      response: data,
      endTime: Date.now(),
    }
  }
})

// 添加认证中间件
client.addMiddleware(async (ctx, next) => {
  ctx.req.requestOptions.headers = {
    ...ctx.req.requestOptions.headers,
    Authorization: `Bearer ${getToken()}`,
  }
  await next()
})
```

中间件上下文 (ctx) 包含以下属性：
- `req`: 请求相关信息
  - `requestOptions`: RestFetch 请求选项
  - `requestInit`: 原生 fetch 请求配置
- `res`: 响应相关信息
  - `response`: 响应数据
  - `when()`: 获取响应 Promise
- `body`: 最终的响应数据
- `state`: 中间件之间共享的状态对象

### 响应处理

可以自定义响应数据的处理方式：

```typescript
const client = new RestFetch({
  baseURL: 'https://api.example.com',
  // 自定义响应处理
  responseThen: (res) => {
    return res.blob()
  }
})
```

### 请求队列

支持三种队列模式：

```typescript
// 1. abort 模式：中断之前的请求
await client.request({
  method: 'GET',
  url: '/search',
  queue: {
    id: 'search',
    mode: 'abort'
  }
})

// 2. wait 模式：等待之前的请求完成
await client.request({
  method: 'GET',
  url: '/search',
  queue: {
    id: 'search',
    mode: 'wait'
  }
})

// 3. parallel 模式：并行执行 （默认）
await client.request({
  method: 'GET',
  url: '/search',
  queue: {
    id: 'search',
    mode: 'parallel'
  }
})
```

### 请求缓存

```typescript
// 使用缓存， 如果缓存 id 命中，则从 clone 流中直接读取
const data = await client.request({
  method: 'GET',
  url: '/users/1',
  cache: {
    id: 'user-1'
  }
})

// 强制更新缓存
const newData = await client.request({
  method: 'GET',
  url: '/users/1',
  cache: {
    id: 'user-1',
    forceUpdate: true
  }
})
```

### 文件下载

```typescript
await client.download({
  url: '/files/download',
  fileName: 'example.pdf', // 可选，自定义文件名
  overwriteName: true // 可选，是否覆盖响应头中的文件名
})
```

### 流式响应

用于处理服务器发送事件（SSE）等流式数据：

```typescript
await client.reader({
  url: '/stream',
  onmessage: (event) => {
    console.log('Received:', event.data)
  }
})
```

## API 参考

### 构造函数选项

| 参数 | 类型 | 描述 | 默认值 |
|------|------|------|---------|
| baseURL | string | 基础 URL | - |
| timeout | number | 超时时间(ms) | - |
| presetRequestInit | (config: RequestInit) => RequestInit | 前置请求配置 (setRequestInit之前) | - |
| setRequestInit | (config: RequestInit) => RequestInit | 请求配置（可被请求选项覆盖） | - |
| responseThen | (res: Response) => any | 响应拦截器 | res => res.json() |
| requestThen | (data: any) => any | 响应拦截器（responseThen之后） | data => data |
| ontimeout | (config: RequestInit) => void | 超时回调 | - |

### 请求选项

| 参数 | 类型 | 描述 | 默认值 |
|------|------|------|---------|
| url | string | 请求路径 | - |
| baseURL | string | 覆盖构造函数中的基础 URL | - |
| method | 'GET' \| 'POST' \| 'PUT' \| 'DELETE' | 请求方法 | - |
| headers | object | 请求头 | - |
| params | object | URL 参数 | - |
| data | object | 请求体数据 | - |
| contentType | 'application/json' \| 'application/x-www-form-urlencoded' \| 'multipart/form-data' | 内容类型 | 'application/json' |
| setRequestInit | (config: RequestInit) => RequestInit | 请求配置，覆盖构造函数配置 | - |
| responseThen | - | 响应拦截器，覆盖构造函数配置 | - |
| timeout | number | 请求超时时间，覆盖构造函数配置 | - |
| ontimeout | (config: RequestInit) => void | 超时回调，覆盖构造函数配置 | - |
| abortController | AbortController | 自定义中断控制器 | new AbortController() |
| cache | { id: string, forceUpdate?: boolean } | 缓存配置 | - |
| queue | { id: string, mode?: 'abort' \| 'wait' \| 'parallel', leave?: boolean } | 队列配置 | - |

### 中间件方法

| 方法 | 描述 |
|------|------|
| addMiddleware(fn: RestFetchMiddleware) | 添加中间件 |
| removeMiddleware(fn: RestFetchMiddleware) | 移除中间件 |

### 中间件接口

```typescript
interface RestFetchMiddleware<S = Record<string, any>> {
  (ctx: RestFetchMiddlewareContext<S>, next: () => Promise<any>): Promise<any>
}

interface RestFetchMiddlewareContext<S = Record<string, any>> {
  req: {
    requestOptions: RestFetchRequestOptions // 请求选项
    requestInit?: RequestInit // 原生请求参数
  }
  res: {
    response?: any // 响应数据
    when: () => Promise<any> // 获取响应Promise
  }
  state: S // 中间件共享状态
  body: any // 最终响应数据
}
```

## 基础示例

:::demo
RestFetch/basic
>>>subs
[RestFetch/api/init, RestFetch/api/posts/index, RestFetch/api/posts/types]
>>>
:::

## 流式响应示例

开启 `node server.cjs` 后预览。

:::demo
RestFetch/reader
>>>subs
[RestFetch/api/stream, RestFetch/api/server]
>>>
:::

## 源码

:::details fetch/RestFetch

:::source
fetch/RestFetch

:::
