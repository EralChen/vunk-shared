# XStream

ref: [XStream](https://github.com/ant-design/x/blob/main/components/x-stream/index.ts)

## Source

:::source
ai/openai/XStream
:::

## mock 可读流示例

```ts
function mockReadableStream () {
  const sseChunks: string[] = []

  for (let i = 0; i < contentChunks.length; i++) {
    const sseEventPart = `event: message\ndata: {"id":"${i}","content":"${contentChunks[i]}"}\n\n`
    sseChunks.push(sseEventPart)
  }

  return new ReadableStream({
    async start (controller) {
      for (const chunk of sseChunks) {
        await new Promise(resolve => setTimeout(resolve, 100))
        controller.enqueue(new TextEncoder().encode(chunk))
      }
      controller.close()
    },
  })
}
```
