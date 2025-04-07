import type { RestFetchConstructorOptions } from '@vunk-shared/fetch'
import { RestFetch } from '@vunk-shared/fetch'
import hmacsha1 from 'hmacsha1'
import randomString from 'string-random'

export class LiblibFetch extends RestFetch {
  private _secretKey: string
  setSecretKey (secretKey: string) {
    this._secretKey = secretKey
  }

  private _accessKey: string
  setAccessKey (accessKey: string) {
    this._accessKey = accessKey
  }

  constructor (options: Partial<RestFetchConstructorOptions> = {}) {
    super({
      baseURL: 'https://openapi.liblibai.cloud',
      ...options,
    })

    this.addMiddleware(async ({ req }, next) => {
      const { url } = req.requestOptions
      if (url.startsWith('http')) { // 其他请求不需要签名
        return
      }
      const signature = this.urlSignature(url)

      req.requestOptions.params = {
        ...req.requestOptions.params,
        AccessKey: this._accessKey,
        Timestamp: signature.timestamp,
        SignatureNonce: signature.signatureNonce,
        Signature: signature.signature,
      }

      await next()
    })
  }

  urlSignature (url: string) {
    if (!url) {
      throw new Error('url is required')
    }

    const timestamp = Date.now() // 当前时间戳
    const signatureNonce = randomString(16) // 随机字符串，你可以任意设置，这个没有要求
    // 原文 = URl地址 + "&" + 毫秒时间戳 + "&" + 随机字符串
    const str = `${url}&${timestamp}&${signatureNonce}`
    const secretKey = this._secretKey // 下单后在官网中，找到自己的 SecretKey'
    const hash = hmacsha1(secretKey, str)
    // 最后一步： encodeBase64URLSafeString(密文)
    // 这一步很重要，生成安全字符串。java、Python 以外的语言，可以参考这个 JS 的处理
    const signature = hash
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')

    return {
      signature,
      timestamp,
      signatureNonce,
    }
  }

  async generateWebuiStatus (generateUuid: string) {
    return this.request({
      url: '/api/generate/webui/status',
      method: 'POST',
      data: {
        generateUuid,
      },
    }).then((res) => {
      return res.data as WebuiStatus
    })
  }
}

/**
 * @example
 * "generateStatus": 5,
        "percentCompleted": 0,
        "generateMsg": "",
        "pointsCost": 10,// 本次任务消耗积分数
        "accountBalance": 1356402,// 账户剩余积分数
        "images": [
            {
                "imageUrl": "https://liblibai-online.liblib.cloud/sd-images/08efe30c1cacc4bb08df8585368db1f9c082b6904dd8150e6e0de5bc526419ee.png",
                "seed": 12345,
                "auditStatus": 3
            }
        ]
    }
 */
export interface WebuiStatus {
  generateUuid: string
  generateStatus: number
  percentCompleted: number
  generateMsg: string
  pointsCost: number
  accountBalance: number
  images: {
    imageUrl: string
    seed: number
    auditStatus: number
  }[]

}
