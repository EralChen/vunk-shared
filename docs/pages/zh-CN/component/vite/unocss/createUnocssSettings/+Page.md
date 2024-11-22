# createUnocssSettings

创建 Unocss 配置

## dependencies

+ [unocss](https://npm.im/unocss)
+ [unocss-preset-vunk](https://npm.im/unocss-preset-vunk)






## Usage


```ts
// vite.config.ts
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [
    UnoCSS(),
  ],
})
```

```ts
// unocss.config.ts
import { defineConfig } from 'unocss'
import { createUnocssSettings } from '@vunk-shared/vite/unocss'

const settings = createUnocssSettings({
  presetFlexPrefix: 'sk',
  presetGapPrefix: 'g',
})


// 如果需要自定义配置，可以直接修改 settings 对象
// settings.shortcuts = unoShortcuts
// const theme = settings.theme as NormalObject
// theme['colors'].test = '#ff0000'


export default defineConfig(settings)

```

```ts
// main.ts
import 'virtual:uno.css'
```


## Basic

:::demo
createUnocssSettings/basic
:::



## Source

:::source
vite/unocss/createUnocssSettings.ts
:::