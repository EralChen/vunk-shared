<script lang="ts" setup>
import { ColorSolver } from '@vunk-shared/css'
const imgUrl = import.meta.env.VITE_BASE_URL + '/imgs/B.png'

const blueSol = new ColorSolver(
  ColorSolver.colorFromCssString('blue'),
).solve()

const redSol = new ColorSolver(
  ColorSolver.colorFromCssString('#ff0000'),
).solve()

</script>
<template>
  <img :src="imgUrl">
  <img
    :src="imgUrl"
    :style="{ filter: blueSol.filter }"
  >
  <img 
    :src="imgUrl"
    :style="{
      filter: redSol.filter,
    }"
  >
</template>
