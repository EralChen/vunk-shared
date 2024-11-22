# @vunk/shared

一个包罗万象的 JS 工具库


在线文档 https://eralchen.github.io/vunk-shared


## 安装


```bash
# npm or yarn or pnpm
pnpm install @vunk/shared
```

:::tip
对于每一类函数，它都有严格的目录分类（对应文档菜单目录）。

您只需按需导入即可，无需担心包体积过大的问题。
:::

## 使用示例

`loadStyleString` 方法用于加载一段 CSS 字符串。

```ts
import { loadStyleString } from '@vunk/shared/browser/document'
const remove = loadStyleString('body { background: red; }')
setTimeout(() => {
  remove()
}, 1000 * 10)
```

## 更多

对于每个函数的用法，请参考单个函数对应的文档。如:

[genDtsFiles](https://eralchen.github.io/vunk-shared/zh-CN/component/build/morph/genDtsFiles)

[toNestedTree](https://eralchen.github.io/vunk-shared/zh-CN/component/data/tree/toNestedTree)

