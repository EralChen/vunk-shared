# DemoContainer

`DemoContainer` 是一个用于展示组件示例的组件，和 `demoContainerPlugin` 配合使用，可以在 markdown 中展示组件示例。


dependencies: 
+ [element-plus](https://www.npmjs.com/package/element-plus)

## Useage


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

