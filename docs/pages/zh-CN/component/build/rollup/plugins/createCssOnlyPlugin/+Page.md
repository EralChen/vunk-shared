# createCssOnlyPlugin

Fork from [rollup-plugin-css-only](https://github.com/thgh/rollup-plugin-css-only)


为 `rollup` 提供 `css` 文件输出


## Test

:::source
build/rollup/plugins/\_\_tests\_\_/createCssOnlyPlugin.test.ts
:::

:::source
build/rollup/plugins/\_\_tests\_\_/css/index
:::


## CreateCssOnlyPluginSettings

| field | type | default | description |
| --- | --- | --- | --- |
| include | FilterPattern |  ['**/*.css'] | 包含的文件 |
| exclude | FilterPattern |  - |排除的文件 |
| fileName | string | 'styles.css' | 输出的文件名 |
| multiple | boolean | false | 是否输出多个文件 |

:::tip

FilterPattern来源: import FilterPattern from 'rollup'


multiple 为 `true` 时，根据入口文件数量输出多个文件，文件名称根据 入口文件目录 + fileName 决定
:::