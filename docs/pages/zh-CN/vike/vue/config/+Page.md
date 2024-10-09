# config

`vike-vue` 参考配置

## Usage

在 vike 工程中 自定义 `renderer/+config.ts`

```ts

import defaultConfig from '@vunk/shared/vike/vue/config'

export default {
  ...defaultConfig,
  
  onRenderClient: 'import:@vunk/shared/vike/vue/onRenderClient:onRenderClient',
  onRenderHtml: 'import:@vunk/shared/vike/vue/onRenderHtml:onRenderHtml',

  passToClient: [
    ...defaultConfig.passToClient,
    'crowdin',
  ],
  clientRouting: true,
  hydrationCanBeAborted: true,
} as Config

```

## Source

:::source
vike/vue/config/index
:::