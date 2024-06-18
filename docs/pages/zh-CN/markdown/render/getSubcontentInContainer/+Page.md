# getSubcontentInContainer

获取容器内的子内容




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
   // subcontent
  getSubcontentInContainer(tokens, idx, 'demo', 'label')
}
```


