import type { RestFetch, RestFetchMiddleware, RestFetchMiddlewareContext } from '@vunk-shared/fetch'
import type { AnyFunc } from '@vunk-shared/types'
import type { MaybePromise } from '@vunk/shared'
import { sleep } from '@vunk-shared/promise'

const stateSymbol = Symbol('retryRestFetchState')

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
      async retryWhen (ctx) {
        const respose = await ctx.res.when()

        if (respose instanceof Error) {
          return true
        }
        if (respose instanceof Response) {
          return respose.status >= 500 || respose.status === 404
        }
        return false
      },
      ...pluginOptions,
      ...state,
    } as Required<RetryRestFetchContext>

    state[stateSymbol] ??= initOptions

    Object.assign(state, initOptions.retryState?.(state) || {})

    await next()

    async function doRetry () {
      if (
        initOptions.retryEnable
        && initOptions.retryTimes > 0
      ) {
        const retryState = {
          ...state[stateSymbol],
          retryTimes: --initOptions.retryTimes,
          [stateSymbol]: state[stateSymbol],
        }
        Object.assign(retryState, initOptions.retryState?.(retryState) || {})

        await sleep(initOptions.retryDelay)

        await restFetch.request(
          requestOptions,
          retryState,
          requestInit,
        ).then((res) => {
          ctx.body = res
        }).finally(() => {
          Reflect.deleteProperty(ctx.state, stateSymbol)
        })
      }
    }

    if (
      initOptions.retryWhen
      && (await initOptions.retryWhen(ctx))
    ) {
      await doRetry()
    }
  }

  restFetch.addMiddleware(retryRestFetchMiddleware)
}

export interface RetryRestFetchPluginOptions {
  retryTimes?: number
  retryDelay?: number

  retryState?: AnyFunc
  /**
   * @description 自定义重试条件
   */
  retryWhen?: (ctx: RestFetchMiddlewareContext) => MaybePromise<boolean>
}
export interface RetryRestFetchContext extends RetryRestFetchPluginOptions {
  retryEnable?: boolean
}
