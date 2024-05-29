<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
})

const decoded = computed(() => {
  return decodeURIComponent(props.source)
})
</script>

<template>
  <div class="vunk-shared-demo-code">
    <div
      v-html="decoded"
    />
  </div>
</template>

<style>
.vunk-shared-demo-code .language-vue {
  margin: 0;
  border-radius: 0;
}
</style>
