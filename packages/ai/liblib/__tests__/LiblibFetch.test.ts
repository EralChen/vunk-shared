import { LiblibFetch } from '@vunk-shared/ai/liblib/LiblibFetch'
import { it } from 'vitest'

const liblibFetch = new LiblibFetch()
liblibFetch.setAccessKey('[accessKey]')
liblibFetch.setSecretKey('[secretKey]')

it('liblibFetch', async () => {
  await liblibFetch.request({
    url: '/api/generate/webui/text2img/ultra',
    method: 'POST',
    data: {
      templateUuid: '5d7e67009b344550bc1aa6ccbfa1d7f4',
      generateParams: {
        prompt: '1 girl,lotus leaf,masterpiece,best quality,finely detail,highres,8k,beautiful and aesthetic,no watermark,',
        aspectRatio: 'portrait',
        // 或者配置imageSize设置具体宽高
        imageSize: {
          width: 768,
          height: 1024,
        },
        imgCount: 1,
        steps: 30, // 采样步数，建议30

        // 高级设置，可不填写
        controlnet: {
          controlType: 'depth',
          controlImage: 'https://liblibai-online.liblib.cloud/img/081e9f07d9bd4c2ba090efde163518f9/7c1cc38e-522c-43fe-aca9-07d5420d743e.png',
        },
      },
    },
  }).then((res) => {
    console.log(res)
  })
})

it('liblibFetch.gen', async () => {
  await liblibFetch.generateWebuiStatus('43b312b137b74fcfbdad4c2eb7da78a9').then((res) => {
    console.log(res)
  })
})
