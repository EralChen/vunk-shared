<script lang="ts" setup>
import { highlight } from '@vunk-shared/markdown/shiki'
import { onMounted, ref } from 'vue'
import code from '../toNestedTree/basic/index.vue?raw'

const highlightCode = ref('')
onMounted(async () => {
  const [highlighter] = await highlight(
    {
      light: 'github-light-default',
      dark: 'github-dark-default',
    },
    {},
  )
  highlightCode.value = await highlighter(code, 'vue', '')
})
</script>

<template>
  <div>
    {{ code }}
  </div>
  <div v-html="highlightCode"></div>
</template>
