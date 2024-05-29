<script lang="ts" setup>
import { data } from './data'
import { VkJsonEditor } from '@vunk/skzz/components/json-editor'
import { toNestedTree } from '@vunk-shared/data'
const toData = toNestedTree(data)
</script>
<template>
  <div sk-flex>
    <div class="flex-1">
      <VkJsonEditor :model-value="data" class="h-full">
      </VkJsonEditor>
    </div>
    <div class="flex-1">
      <VkJsonEditor :model-value="toData">
      </VkJsonEditor>
    </div>
  </div>
</template>
