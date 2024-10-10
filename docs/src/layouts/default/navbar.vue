<script lang="ts" setup>
import VpThemeToggler from '#/vitepress/components/navbar/vp-theme-toggler.vue'
import AlgoliaSearchBox from '#s/components/AlgoliaSearchBox.vue'
const base = import.meta.env.VITE_BASE_URL



</script>
<template>
  <div
    sk-flex="row-between-center"
    class="h-full layout-default-navbar"
  >
    <a
      class="font-600 gplr-l gptb-s text-primary"
      :href="base"
    >
      @vunk/shared
    </a>
    

    <div sk-flex="row_center">
      <AlgoliaSearchBox></AlgoliaSearchBox>
      <VpThemeToggler></VpThemeToggler>
    </div>
  </div>
</template>

