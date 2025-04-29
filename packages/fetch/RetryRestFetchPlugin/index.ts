import type { RestFetch, RestFetchMiddleware } from '../RestFetch'
import { sleep } from '@vunk-shared/promise'

export function RetryRestFetchPlugin (
  restFetch: RestFetch,
  pluginOptions?: RetryRestFetchPluginOptions,
) {
  const retryRestFetchMiddleware: RestFetchMiddleware<RetryRestFetchContext> = async (ctx, next) => {
    const { state, req: { requestOptions, requestInit } } = ctx

    const initOptions = {
      retryTimes: 3,
      retryDelay: 4000,
      retryEnable: true,
      ...pluginOptions,
      ...state,
    } as Required<RetryRestFetchContext>

    await next()

    async function doRetry () {
      if (
        initOptions.retryEnable
        && initOptions.retryTimes > 0
      ) {
        await sleep(initOptions.retryDelay)
        ctx.body = await restFetch.request(
          requestOptions,
          {
            ...state,
            retryTimes: --initOptions.retryTimes,
          },
          requestInit,
        )
      }
    }

    if (ctx.body instanceof Promise) {
      await ctx.body.catch(doRetry)
    }
    else if (
      initOptions.retryWhen
      && initOptions.retryWhen(ctx.body)
    ) {
      await doRetry()
    }
  }

  restFetch.addMiddleware(retryRestFetchMiddleware)
}

export interface RetryRestFetchPluginOptions {
  retryTimes?: number
  retryDelay?: number
  /**
   * @description 自定义重试条件
   */
  retryWhen?: (body: any) => boolean
}
export interface RetryRestFetchContext extends RetryRestFetchPluginOptions {
  retryEnable?: boolean
}
