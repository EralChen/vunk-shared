export const createMd = (t: string, l: string) => `--- 
title: ${t}
lang: zh-CN
---

# ${t}

${t}


## Basic

:::demo 
${l}/basic
:::

## ${t} 其他
`

export const createVue = () => `<script lang="ts" setup>

</script>
<template>
  <div></div>
</template>`