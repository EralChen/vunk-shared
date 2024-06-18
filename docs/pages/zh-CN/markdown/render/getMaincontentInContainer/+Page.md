# getMaincontentInContainer

获取容器内的主要内容

## Usage


```md
:::demo
test/demo
>>>label
subcontent
>>>
:::
```

```ts
render (tokens: Token[], idx: number) {
  // test/demo
  getMaincontentInContainer(tokens, idx, 'demo')
}
```

