<script lang="ts" setup>
import type { Post } from './api'
import { onMounted, ref } from 'vue'
import { rPosts } from './api'

const data = ref<Post[]>([])

onMounted(async () => {
  const res = await rPosts()
  data.value = res
})
</script>

<template>
  <div>{{ data.map(item => item.id) }}</div>
</template>
