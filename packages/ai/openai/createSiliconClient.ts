import type { ClientOptions } from 'openai'
import OpenAI from 'openai'

export function createSiliconClient (options: ClientOptions) {
  const client = new OpenAI({
    ...options,
    baseURL: 'https://api.siliconflow.cn/v1',
  })

  return client
}
