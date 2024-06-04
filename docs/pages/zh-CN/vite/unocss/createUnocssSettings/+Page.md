# createUnocssSettings

创建 Unocss 配置

## dependencies

+ [unocss](https://npm.im/unocss)
+ [unocss-preset-vunk](https://npm.im/unocss-preset-vunk)






## Useage

```ts
// unocss.config.ts
import { defineConfig } from 'unocss'
import { createUnocssSettings } from '@vunk-shared/vite/unocss'

const settings = createUnocssSettings({
  presetFlexPrefix: 'sk',
  presetGapPrefix: 'g',
})

export default defineConfig(settings)

```


## Basic

:::demo
createUnocssSettings/basic
:::



## Source

:::source
vite/unocss/createUnocssSettings.ts
:::