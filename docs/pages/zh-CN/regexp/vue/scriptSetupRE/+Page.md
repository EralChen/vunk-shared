# scriptSetupRE


## Usage

```ts
setupHtml = setupHtml.replace(scriptSetupRE, (_, attr1, attr2, code) => {
  const attr = `${attr1} ${attr2}`.trim()
  return [
    `<script setup ${attr}>`,
    ...leadingCode,
    code,
    ...trailingCode,
    '</script>',
  ].filter(Boolean).join('\n')
})
```

## Source

:::source
regexp/vue/scriptSetupRE.ts
:::

