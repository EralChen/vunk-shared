# RetryRestFetchPlugin

RetryRestFetchPlugin 是 RestFetch 的插件，提供请求失败后的自动重试功能。当网络不稳定或服务端暂时性故障时，自动重试可以提高请求成功率，增强应用的健壮性。

## 安装

RetryRestFetchPlugin 已包含在 @vunk-shared/fetch 包中，可直接导入使用：

```ts
import { RestFetch } from '@vunk-shared/fetch'
import { RetryRestFetchPlugin } from '@vunk-shared/fetch/RetryRestFetchPlugin'
```

## 基本用法

通过 RestFetch 的 `use` 方法安装插件：

```ts
const restFetch = new RestFetch({
  baseURL: 'https://api.example.com',
})

// 安装插件，使用默认配置
restFetch.use(RetryRestFetchPlugin)

// 或提供自定义配置
restFetch.use(RetryRestFetchPlugin, {
  retryTimes: 3,
  retryDelay: 2000,
})
```

## 配置参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| retryTimes | number | 3 | 重试次数 |
| retryDelay | number | 4000 | 重试延迟时间（毫秒） |
| retryWhen | (ctx: any) => MaybePromise\<boolean\> | undefined | 重试条件函数 |

**注意**：重试次数是指除首次请求外，额外尝试的次数。例如，`retryTimes = 3` 表示首次请求失败后，最多会额外重试 3 次，总共发送 4 次请求。

## 请求级配置

除了全局配置，你还可以在单个请求中使用不同的重试策略：

```ts
restFetch.request({
  method: 'GET',
  url: '/api/data',
}, {
  retryTimes: 5, // 重试 5 次
  retryDelay: 1000, // 每次重试间隔 1 秒
  retryEnable: true, // 启用重试功能
})
```

## 自定义重试条件

默认情况下，插件会在请求失败时自动重试。

```ts
async function retryWhen (ctx) {
  const respose = await ctx.res.when()

  if (respose instanceof Error) {
    return true
  }
  if (respose instanceof Response) {
    return respose.status >= 500 || respose.status === 404
  }
  return false
}
```

但你可以通过 `retryWhen` 函数自定义重试条件：

```ts
restFetch.use(RetryRestFetchPlugin, {
  // 当响应状态码为 500 时重试
  async retryWhen (ctx) {
    const respose = await ctx.res.when()
    if (respose instanceof Response) {
      return respose.status = 500
    }
    return false
  }
})
```

或在单个请求上配置：

```ts
restFetch.request({
  method: 'GET',
  url: '/api/data',
}, {
  retryWhen,
})
```

## 完整示例

以下是使用 RetryRestFetchPlugin 的完整示例：

```ts
import { RestFetch } from '@vunk-shared/fetch'
import { RetryRestFetchPlugin } from '@vunk-shared/fetch/RetryRestFetchPlugin'

// 创建 RestFetch 实例
const restFetch = new RestFetch({
  baseURL: 'http://example.api.com',
})

// 安装重试插件
restFetch.use(RetryRestFetchPlugin, {
  retryTimes: 3,
  retryDelay: 2000,
})

// 发送请求
function fetchData () {
  return restFetch.request({
    method: 'GET',
    url: '/api/data',
  }, {
    // 特定请求的重试配置
    retryTimes: 2,
  }).then((res) => {
    console.log('请求成功', res)
    return res
  }).catch((err) => {
    console.error('所有重试均失败', err)
    throw err
  })
}
```

## 与其他插件配合

RetryRestFetchPlugin 可以与其他插件（如 ElementPlusRestFetchPlugin）一起使用：

```ts
restFetch.use(ElementPlusRestFetchPlugin, {
  customOk: (res) => {
    if (res instanceof Response && res.status !== 200) {
      return false
    }

    if (isPlainObject(res) && res.code !== 200) {
      return false
    }
    return true
  },
  onerror: (err) => {
    if (err instanceof Response) {
      if (err.status === 401) {
        ElMessage.error('请先登录')
        sessionStorage.removeItem('accessToken')
        localStorage.removeItem('token')
        localStorage.removeItem('accessToken')
        setTimeout(() => {
          window.location.href = `${import.meta.env.BASE_URL}login`
        }, 1000)
        return
      }
      if (err.status === 403) {
        ElMessage.error('没有权限访问')
        return
      }
    }
    defaultOnerror(err)
  },
} as ElementPlusRestFetchPluginOptions)

restFetch.use(RetryRestFetchPlugin, {
  retryTimes: 2,
  async retryWhen (ctx: RestFetchMiddlewareContext) {
    const { res, req: { requestOptions } } = ctx

    const respose = await res.when()

    if (respose instanceof Response) {
      if (respose.status === 401) {
        return true
      }
      if (respose.status === 403) { // accessToken token 失效，尝试使用 token
        sessionStorage.removeItem('accessToken')

        const token = localStorage.getItem('token')
          || localStorage.getItem('accessToken')

        if (token && requestOptions.headers) {
          requestOptions.headers.Authorization = token
        }

        return true
      }
    }
    return false
  },
  retryState: (state) => {
    if (state.retryTimes !== 0) {
      return {
        error: false,
      }
    }
  },
} as RetryRestFetchPluginOptions)
```

## 基本演示

以下示例展示了 RetryRestFetchPlugin 的基本用法：

:::demo
RetryRestFetchPlugin/basic
>>>subs
[RetryRestFetchPlugin/api]
>>>
:::

在上面的示例中，请求 `/error` 接口会自动重试，直到达到配置的重试次数或请求成功为止。
