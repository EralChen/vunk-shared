# onContentUpdated

## Usage


```ts
const headers = shallowRef<MenuItem[]>([])
onContentUpdated(() => {
  headers.value = getHeaders(2)
}, {
  hooks: ['mounted', 'updated'],
})
```



## Source

:::source
vike/vue/hooks/onContentUpdated
:::