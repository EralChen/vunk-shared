# DemoContainer

[demoContainerPlugin](../../plugins/demoContainerPlugin/+Page.md) 的内置组件, 用于展示 vue 示例的组件.


## dependencies

+ [element-plus](https://www.npmjs.com/package/element-plus)

## Usage


```md

:::demo
custom-check-tree/index
>>>subs
[custom-check-tree/a, custom-check-tree/b]
>>>
:::

```


## DemoContainer Props

|prop|type|default|descriptions|
|---|---|---|---|
|demos*|NormalObject|{}|组件示例合集|
|path*|string|''|当前组件路径|
|source*|string|''| `md.render` 后的组件代码 |
|rawSource|string|''|组件源码|
|subsources| jsonstring |'{}'|`md.render` 后的其他引用代码|

