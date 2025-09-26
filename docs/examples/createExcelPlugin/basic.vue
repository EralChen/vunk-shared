<script lang="ts" setup>
import data, { sheets } from './摄像头坐标.xlsx'

console.log('sheets', sheets)
console.log('data', data)
</script>

<template>
  <div>{{ data }}</div>
</template>
