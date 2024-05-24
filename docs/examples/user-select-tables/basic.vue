<script lang="ts" setup>
import { SkUserSelectTables } from '@vunk-shared/components/user-select-tables'
import { ref } from 'vue'
import { User } from '@vunk-shared/api/user'

const currentUsers = ref<User[]>([])
</script>
<template>
  <p>currentUsers: {{ currentUsers }}</p>
  <SkUserSelectTables
    v-model="currentUsers"
  ></SkUserSelectTables>
</template>