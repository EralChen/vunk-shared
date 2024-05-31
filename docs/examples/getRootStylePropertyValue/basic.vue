<script lang="ts" setup>
import { getRootStylePropertyValue } from '@vunk-shared/browser'
const color = getRootStylePropertyValue('--el-color-primary')
</script>
<template>
  <div>--el-color-primary: {{ color }}</div>
</template>
