import type { AnyFunc, NormalObject, ReturnVoid } from '@vunk/shared'
import type { LoadingOptions } from 'element-plus'
import type { Ref } from 'vue'
import type { RestFetch, RestFetchMiddleware } from '../RestFetch'
import { isPlainObject } from '@vunk-shared/object'
import { sleep } from '@vunk-shared/promise'
import { ElLoading, ElLoadingService, ElMessage } from 'element-plus'

import { throttle } from 'lodash-es'
import { isRef } from 'vue'

export const defaultOnerror = throttle((err) => {
  let message = '系统错误'
  if (err instanceof Error) {
    if (
      err.name === 'AbortError'
      && err.message.includes('user')
    ) {
      return
    }

    const local = {
      'Failed to fetch': '请求失败',
      'The user aborted a request.': '请求被终止',
    }
    message = local[err.message] || err.message
  }

  if (typeof err === 'string') {
    message = err
  }
  if (isPlainObject(err)) {
    const msg = (err as NormalObject)?.msg || (err as NormalObject)?.message
    msg && (message = msg)
  }
  ElMessage({
    type: 'error',
    message,
  })
}, 500, { trailing: false })

/**
 * 默认的业务成功条件
 * @param res
 * @returns
 */
export const defaultCustomOk: AnyFunc = (res) => {
  return res.code === 200 || res.status === 10001
}

export function ElementPlusRestFetchPlugin (
  restFetch: RestFetch,
  pluginOptions?: ElementPlusRestFetchPluginOptions,
) {
  const pluginOnerror = pluginOptions?.onerror || defaultOnerror
  const pluginCustomOk = pluginOptions?.customOk || defaultCustomOk

  const restFetchMiddleware: RestFetchMiddleware<ElementPlusRestFetchContext> = async (ctx, next) => {
    const { state, res } = ctx

    const initOptions = {
      loading: true,
      loadingDelay: 400,
      loadingClose: true,
      ...state,
      error: state.error ?? true,
      onerror: state.onerror ?? pluginOnerror,
    } as Required<ElementPlusRestFetchContext>

    const loading = initOptions.loading
    let loadingService: ReturnType<typeof ElLoadingService> | null = null

    console.log('ElementPlusRestFetchPlugin', ctx)

    await next()

    Object.assign(initOptions, ctx.state)

    console.log('ElementPlusRestFetchPlugin next', initOptions)

    const resReady = res.when()

    resReady.catch((err) => {
      if (initOptions.error) {
        initOptions.onerror(err)
      }
    })

    if (loading) {
      const LoadingService = ElLoading.service || ElLoadingService

      const preres = await Promise.race([
        sleep(initOptions.loadingDelay),
        resReady,
      ])
      if (!preres) { // 超时开启loading
        if (isRef(initOptions.loading)) {
          initOptions.loading.value = true
        }
        else {
          loadingService = LoadingService(
            typeof initOptions.loading === 'boolean'
              ? {}
              : initOptions.loading,
          )
        }
      }
    }

    if (initOptions.loadingClose) {
      resReady.finally(() => {
        loadingService?.close()
        if (isRef(initOptions.loading)) {
          initOptions.loading.value = false
        }
      })
    }

    await resReady.then((data) => {
      if (pluginCustomOk(data)) {
        initOptions.successMessage && ElMessage({
          type: 'success',
          message:
                typeof initOptions.successMessage === 'string'
                  ? initOptions.successMessage
                  : data.msg || data.message || '请求成功',
        })
      }
      else {
        initOptions.error && initOptions.onerror(data)
        if (initOptions.throwResErr) {
          ctx.body = Promise.reject(data)
        }
      }
    })
  }

  restFetch.addMiddleware(restFetchMiddleware)
}

export interface ElementPlusRestFetchPluginOptions {
  /**
   * 自定义业务响应成功的条件
   * @default
   * (res) => (res.code === 200 || res.status === 10001)
   */
  customOk?: AnyFunc

  /**
   * 自定义错误处理
   * @default (e) => { throw e }
   */
  onerror?: Onerror
}

export interface ElementPlusRestFetchContext {

  /**
   * 请求成功 将提示 msg
   */
  successMessage?: boolean | string

  /**
   * 后端有响应
   * 但是 code 不成功
   * 是否需要抛出异常
   * @default false
   */
  throwResErr?: boolean

  /**
   * 是否显示 loading
   * @default true
   */
  loading?: boolean | LoadingOptions | Ref<boolean>

  /**
   * 请求成功后，是否关闭 loading
   */
  loadingClose?: boolean

  /**
   * loading 延时出现
   */
  loadingDelay?: number

  /**
   * 若为true 则在请求失败时，触发回调 onerror
   * @default true
   */
  error?: boolean

  /**
   * fetch 请求错误时回调
   */
  onerror?: Onerror<ErrorEvent>
}

/**
 * 错误回调
 */
export type Onerror<E = ErrorEvent> = (e: E) => ReturnVoid

/**
 *  Response: !response.ok
 *  Error:  request error, abort error
 *  { msg: string }: 业务错误
 *  string: 业务错误
 */
export type ErrorEvent = BaseErrorEvent | { msg?: string, message?: string } | string

/**
 *  Response: !response.ok
 *  Error:  request error, abort error
 */

export type BaseErrorEvent = Response | Error
