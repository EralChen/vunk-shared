import { restFetch } from './init'
import { RestFetchReaderOnmessage } from '@vunk-shared/fetch'


export const rTestStream = (
  onmessage: RestFetchReaderOnmessage,
  abortController?: AbortController,
) => {

  return restFetch.reader({
    url: '/stream',
    onmessage: onmessage,
    abortController: abortController,
  }, {
    // 为了方便测试，连接本地服务
    baseURL: 'http://localhost:3324',
  })

}