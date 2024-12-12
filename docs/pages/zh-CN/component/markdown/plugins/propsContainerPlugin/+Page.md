# propsContainerPlugin

根据 `ts` 文件生成 `props`描述表格在 `markdown` 中的展示。


## Usage

### ctx 样例
:::source
markdown/plugins/\_\_tests\_\_/propsContainerPlugin.ctx.ts
:::



### md 使用
```md
:::props
>>>leading
|leading|-|-|-|
>>>
markdown/components/DemoContainer/src/ctx.ts
>>>trailing
|trailing|-|-|-|
>>>
:::
```

:::props
>>>leading
|leading|-|-|-|
|leading2|-|-|-|
>>>
markdown/components/DemoContainer/src/ctx.ts
>>>trailing
|trailing|-|-|-|
|trailing2|-|-|-|
>>>
:::
