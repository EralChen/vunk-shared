<script lang="ts" setup>
import { LinkedNode } from '@vunk-shared/types'
import { computed, ref } from 'vue'
import { manageLinkedList } from '@vunk-shared/data/link'

const list = ref(
  [
    { id: '3', nextId: '4' },
    { id: '4', nextId: '1' },
    { id: '1', nextId: '2' },
    { id: '2', nextId: '3' },
    { id: '5', nextId: '6' },
    { id: '6', nextId: '7' },
    { id: '7', nextId: '' },
  ] as LinkedNode[],
) 

const links = computed(() => {
  const { data } = manageLinkedList(list.value)
  console.log(data)
  return data
})
</script>
<template>
  <div>{{ links }}</div>
</template>
