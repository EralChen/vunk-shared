<script lang="ts" setup>
import type { Post } from './api/posts'
import { ref } from 'vue'
import { rPosts } from './api/posts'

const posts = ref<Post[]>([])

read()
function read () {
  rPosts().then((res) => {
    posts.value = res
  })
}
</script>

<template>
  <ul>
    <li v-for="post in posts.slice(0, 3)" :key="post.id">
      {{ post.title }}
    </li>
  </ul>
</template>
