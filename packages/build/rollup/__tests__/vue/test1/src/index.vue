<script lang="tsx" setup>
import { ref } from 'vue'
import './styles/a.css'
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
  <div class="test-x">{{ data }} : {{  value  }}</div>
  <component :is="icon"></component>
</template>
<style>
.test-x {
  color: red;
}
</style>