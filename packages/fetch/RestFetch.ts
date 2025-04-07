import type { AnyFunc, MaybePromise, NormalObject, ReturnVoid } from '@vunk/shared'
import type { EventSourceParseCallback } from 'eventsource-parser'
import { noop } from '@vunk-shared/function'
import { createParser } from 'eventsource-parser'
import { stringify } from 'qs'

export class RestFetch {
  baseURL: RestFetchConstructorOptions['baseURL']
  setRequestInit: RestFetchConstructorOptions['setRequestInit']
  presetRequestInit: RestFetchConstructorOptions['presetRequestInit']
  responseThen: RestFetchConstructorOptions['responseThen']
  requestThen: RestFetchConstructorOptions['requestThen']
  timeout: RestFetchConstructorOptions['timeout']
  ontimeout: RestFetchConstructorOptions['ontimeout']

  protected caches: Record<string, Promise<Response>>
  protected queues: Record<string, {
    promise: Promise<Response>
    abortController: AbortController
  }[]>

  /**
   * 请求拦截队列
   */
  protected requestInterceptorQueue: RequestInterceptor[] = []

  constructor (options: RestFetchConstructorOptions) {
    this.baseURL = options.baseURL
    this.setRequestInit = options.setRequestInit
    this.presetRequestInit = options.presetRequestInit
    this.responseThen = options.responseThen || (res => res.json())
    this.requestThen = options.requestThen || (res => res)

    this.timeout = options.timeout
    this.ontimeout = options.ontimeout

    this.caches = {}
    this.queues = {}
  }

  response (
    options: RestFetchRequestOptions,
    requestInit?: RequestInit,
  ) {
    let readyPromise: Promise<Response>
    if (options.cache?.id) { // 如果提供缓存id 则从缓存获取promise
      if (!this.caches[options.cache.id] || options.cache.forceUpdate) { // 如果没有缓存先赋值, 或者需要强制更新缓存
        this.caches[options.cache.id] = this.initFetch(options, requestInit)
      }
      readyPromise = this.caches[options.cache.id]
      // https://github.com/whatwg/fetch/issues/196
      // res.json() 会消耗流数据 需要clone以便重用
        .then(res => res.clone())
    }
    else {
      readyPromise = this.initFetch(options, requestInit)
    }
    const responseThen = options.responseThen ?? this.responseThen
    return readyPromise.then(responseThen)
  }

  request (options: RestFetchRequestOptions, ...args: any[]): Promise<any>
  request (
    options: RestFetchRequestOptions,
    requestInit?: RequestInit,
  ) {
    return this.response(options, requestInit)
      .then(this.requestThen)
  }

  async download (
    downloadOpts: {
      url: string
      fileName?: string
      overwriteName?: boolean
    },
    options?: Partial<RestFetchRequestOptions>,
    requestInit?: RequestInit,
  ) {
    return this
      .response({
        method: 'POST',
        url: downloadOpts.url,
        responseThen: res => res,
        ...options,
      }, requestInit)

      .then((res) => {
        const headers = res.headers

        // 获取文件名
        let fileName = downloadOpts.fileName ?? `${new Date()}`

        if (!downloadOpts.overwriteName || !downloadOpts.fileName) {
          // 如果不是确认覆盖文件名，或者没有提供文件名
          // 尝试从响应头获取文件名
          const disposition = headers.get('content-disposition')
          if (disposition) {
            const reg = /filename[*^]?=?"?([^&;"]*)"?/
            const fileNameEncode = reg.exec(disposition)?.[1]
            if (fileNameEncode) {
              fileName = decodeURIComponent(fileNameEncode)
            }
            const ns = fileName.split(`'`)
            if (ns.length > 1) {
              // ['utf-8', 'en', 'filename']
              const [charset, , ...names] = ns
              if (['utf-8'].includes(charset.toLocaleLowerCase())) {
                fileName = names.join(`'`)
              }
            }
          }
        }

        return Promise.all([
          res.blob(),
          fileName,
        ])
      })

      .then(([blob, fileName]) => {
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        window.URL.revokeObjectURL(link.href)
      })
  }

  async reader (
    readerOpts: {
      url: string
      onmessage: EventSourceParseCallback
      abortController?: AbortController
    },
    requestOptions?: Partial<RestFetchRequestOptions>,
    requestInit?: RequestInit,
  ) {
    const onmessage = readerOpts.onmessage ?? noop

    const reader: ReadableStreamDefaultReader<Uint8Array> = await this.response({
      url: readerOpts.url,
      method: 'POST',
      responseThen: res => res.body?.getReader(),
      abortController: readerOpts.abortController,
      ...requestOptions,
    }, requestInit)
    const decoder = new TextDecoder('utf-8')
    const parser = createParser(onmessage)
    if (!reader)
      return
    while (true) {
      const { done, value } = await reader.read()
      if (done)
        break
      parser.feed(decoder.decode(value))
    }
  }

  private async initFetch (
    options: RestFetchRequestOptions,
    init?: RequestInit,
  ): Promise<Response> {
    if (this.requestInterceptorQueue.length) {
      for (const fn of this.requestInterceptorQueue) {
        options = await fn(options)
      }
    }

    /* 超时处理 */
    let abortController = options.abortController
    if (!abortController) {
      abortController = new AbortController()
    }
    const timeout = options.timeout ?? this.timeout
    /* 超时处理 end */

    const headers = new Headers()

    // 初始化init参数
    let config: RequestInit = {
      method: options.method,
      headers,
      signal: abortController?.signal,
    }

    const postContentType = options.contentType || 'application/json'

    if (options.method !== 'GET') {
      headers.set('Content-Type', postContentType)
      switch (postContentType) {
        case 'application/json':
          config.body = JSON.stringify(options.data)
          break
        case 'application/x-www-form-urlencoded':
          config.body = stringify(options.data)
          break
        case 'multipart/form-data': {
        // 默认会生成带hash的 ContentType
          headers.delete('Content-Type')
          let formData = new FormData()

          if (options.data) {
            if (options.data instanceof FormData) {
              formData = options.data
            }
            else {
              const keys = Reflect.ownKeys(options.data) as string[]
              keys.forEach((key) => {
                formData.append(key, options.data?.[key] as string | Blob)
              })
            }
          }
          config.body = formData
          break
        }
      }
    }

    // 设置请求头
    if (options.headers) {
      Object.keys(options.headers).forEach((key) => {
        headers.set(key, options.headers?.[key])
      })
    }

    // 将params 参数拼接到url
    let params = ''
    if (options.params) {
      params = `?${stringify(options.params)}`
    }
    const input = (options.baseURL || this.baseURL) + options.url + params

    // 请求拦截
    const setRequestInit = options.setRequestInit ?? this.setRequestInit
    if (this.presetRequestInit) {
      config = this.presetRequestInit(config)
    }

    if (setRequestInit) {
      config = setRequestInit(config)
    }

    const fetchFn = () => {
      const p = fetch(input, {
        ...config,
        ...init,
      }).then((res) => {
        if (!res.ok)
          return Promise.reject(res)
        return res
      })

      /* 超时处理2 */
      if (!timeout)
        return p
      const ontimeout = options.ontimeout ?? this.ontimeout
      const timeoutId = window.setTimeout(() => {
        abortController?.abort()
        ontimeout?.(config)
      }, timeout)
      p.finally(() => {
        window.clearTimeout(timeoutId)
      })
      /* 超时处理2 end */

      return p
    }

    let fetchPromise: Promise<Response> | undefined

    /* 设置队列 */
    if (
      (!options.queue?.id)
      || options.queue.leave
    ) {
      fetchPromise = fetchFn()
      return fetchPromise
    }
    if (!this.queues[options.queue.id]) {
      this.queues[options.queue.id] = []
    }
    if (options.queue.mode === 'parallel') {
      fetchPromise = fetchFn()
      // 并行模式, 直接push
      this.queues[options.queue.id].push({
        promise: fetchPromise,
        abortController,
      })
    }
    else if (options.queue.mode === 'wait') {
      // 等待其他请求完成
      const promises = this.queues[options.queue.id].map(({ promise }) => promise)
      // 所有请求完成，无论成功失败
      const others = Promise.allSettled(promises)

      fetchPromise = others.then(() => {
        return fetchFn()
      })
      // 清空之前队列，只保留当前请求
      this.queues[options.queue.id] = [
        {
          promise: fetchPromise,
          abortController,
        },
      ]
    }
    else {
      // 取消其他请求
      this.queues[options.queue.id].forEach(({ abortController }) => {
        abortController?.abort()
      })
      fetchPromise = fetchFn()

      this.queues[options.queue.id] = [{
        promise: fetchPromise,
        abortController,
      }]
    }
    /* 设置队列 end */

    return fetchPromise ?? fetchFn()
  }

  addRequestInterceptor (fn: RequestInterceptor) {
    this.requestInterceptorQueue.push(fn)
  }

  removeRequestInterceptor (fn: RequestInterceptor) {
    const index = this.requestInterceptorQueue.indexOf(fn)
    if (index !== -1) {
      this.requestInterceptorQueue.splice(index, 1)
    }
  }
}

type ContentType = 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data'

export interface RequestInterceptor {
  (
    options: RestFetchRequestOptions,
  ): MaybePromise<RestFetchRequestOptions>
}

/**
 * RestFetch 构造函数参数
 */
export interface RestFetchConstructorOptions {

  baseURL: string

  /**
   * 请求拦截 在  setRequestInit 和 requestInterceptorQueue 之前
   */
  presetRequestInit?: (config: RequestInit) => RequestInit

  /**
   * 请求拦截 设置 RequestInit
   */
  setRequestInit?: (config: RequestInit) => RequestInit
  /**
   * 响应拦截
   * @default res => res.json()
   */
  responseThen?: (res: Response) => any
  /**
   * 响应拦截, 发生在 responseThen 之后
   * @default res => res
   */
  requestThen?: AnyFunc

  /**
   * 默认超时时间
   * 单位 ms
   */
  timeout?: number

  /**
   * 超时回调
   */
  ontimeout?: (config: RequestInit) => ReturnVoid

}

/**
 * restFetch.request 参数
 */
export interface RestFetchRequestOptions {
  /**
   * 请求地址
   * baseURL + url
   */
  url: string

  /**
   * 覆盖 RestFetchConstructorOptions 的 baseURL
   */
  baseURL?: string

  method: 'POST' | 'GET' | 'PUT' | 'DELETE'
  /**
   * 请求参数
   * 请求体
   */
  data?: Record<string, any>
  /**
   * 请求参数
   * 请求地址拼接参数
   */
  params?: Record<string, any>

  /**
   * 请求头
   * @default {}
   */
  headers?: NormalObject

  /**
   * 请求头
   * @default 'application/json'
   */
  contentType?: ContentType

  /**
   * 请求拦截 设置 RequestInit
   * 会覆盖 RestFetchConstructorOptions 的 setRequestInit
   *
   */
  setRequestInit?: (config: RequestInit) => RequestInit

  /**
   * 响应拦截
   * 会覆盖 RestFetchConstructorOptions 的 responseThen
   */
  responseThen?: (res: Response) => any

  /**
   * 自定义 AbortController
   * timeout 时间到会自动 abort
   * @default new AbortController()
   */
  abortController?: AbortController

  /**
   * 超时时间
   * 单位 ms
   * 会覆盖 RestFetchConstructorOptions 的 timeout
   */
  timeout?: number

  /**
   * 超时回调
   * 会覆盖 RestFetchConstructorOptions 的 ontimeout
   */
  ontimeout?: (config: RequestInit) => ReturnVoid

  /**
   * 设置缓存
   */
  cache?: {
    /**
     * 唯一标识
     */
    id: string
    /**
     * 是否强制更新
     */
    forceUpdate?: boolean
  }

  /**
   * 队列
   */
  queue?: {
    /**
     * 唯一标识
     */
    id: string

    /**
     * 选择模式，
     * abort. 有相同id的请求，打断之前的请后执行
     * wait. 有相同id的请求，等待之前的请求完成后再执行
     * parallel. 仅加入队列，与队列中其他请求并行执行
     *
     */
    mode?: 'abort' | 'wait' | 'parallel'

    /**
     * 是否离开队列
     */
    leave?: boolean
  }
}

/**
 * restFetch.response
 */
export interface RestFetchResponse {
  (
    options: RestFetchRequestOptions,
    requestInit?: RequestInit
  ): Promise<Response>
}

/**
 * restFetch.request
 */
export interface RestFetchRequest {
  (
    options: RestFetchRequestOptions,
    requestInit?: RequestInit
  ): Promise<any>
}

export type RestFetchReaderOnmessage = EventSourceParseCallback
