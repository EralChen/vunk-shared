<script lang="tsx" setup>
import { ref } from 'vue'
const data = ref('data')
const props = defineProps({
  value: {
    type: String,
    default: 'value'
  }
})

const icon = <i class="icon" data-test={props.value}></i>
</script>
<template>
  <div class="test2-x">{{ data }} : {{  value  }}</div>
  <component :is="icon"></component>
</template>
<style>
.test2-x {
  color: red;
}
</style>
