<script setup lang="ts">
import { VkClientOnly } from '@vunk/core/components/client-only'
defineProps({
  file: {
    type: String,
    required: true,
  },
  demo: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="vunk-shared-demo-example-showcase">
    <VkClientOnly>
      <component
        :is="demo"
        v-if="demo"
        v-bind="$attrs"
      />
    </VkClientOnly>
  </div>
</template>


<style>
.vunk-shared-demo-example-showcase{
  background-color: var(--bg-color);
  padding: var(--gap-page);
  min-height: 450px;
}
</style>

