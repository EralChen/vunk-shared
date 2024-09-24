<script lang="ts" setup>
import { ref } from 'vue'
import { Post, rPosts } from './api/posts'

const posts = ref<Post[]>([])

read()
function read () {
  rPosts().then(res => {
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
