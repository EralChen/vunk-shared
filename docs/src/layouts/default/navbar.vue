<script lang="ts" setup>
import type { CrowdinFile, NavRaw } from '#/shared'
import { CrowdinFilePath, useCrowdinFile } from '#/src/composables/crowdin'
import VpThemeToggler from '#/vitepress/components/navbar/vp-theme-toggler.vue'
import { VkRoutesMenuContent } from '#s/components/routes-menu-content'
import { resolveFullPath } from '@vunk-shared/string/url'
import { computed, onMounted, shallowRef } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const navCrow = useCrowdinFile(CrowdinFilePath.nav) as CrowdinFile<NavRaw[]>
const basePath = import.meta.env.BASE_URL + navCrow.lang

const menuData = computed(() => {
  return navCrow.source.map((row) => {
    return {
      path: row.path,
      name: row.value,
      meta: {
        title: row.label,
      },
      redirect: row.redirect,
    } as RouteRecordRaw
  })
})

/* active menu */
const pathname = shallowRef('')
onMounted(() => {
  pathname.value = window.location.pathname
  // 同步 pathname
  setInterval(() => {
    pathname.value = window.location.pathname
  }, 400)
})
const currentCrowname = computed(() => {
  if (!pathname.value)
    return
  const current = pathname.value.replace(basePath, '')
  const name = current.split('/').filter(Boolean).shift()
  return name
})
/* endof active menu  */
</script>

<template>
  <div
    sk-flex="row-between-center"
    class="h-full layout-default-navbar"
  >
    <div class="font-600 plr-l ptb-s text-primary">
      @vunk/shared
    </div>

    <div sk-flex="row_center" sub:gml-s>
      <ElMenu
        mode="horizontal"
        :default-active="`${basePath}/${currentCrowname}`"
      >
        <VkRoutesMenuContent
          :data="menuData"
          :base-path="basePath"
        >
          <template #item="{ href, data, basePath: base }">
            <a
              :href="data.redirect
                ? resolveFullPath(data.redirect, base)
                : href
              "
              class="layout-default-nav-menu-a"
              :title="data.meta?.title"
            >
            </a>
          </template>
          <template #itemTitle="{ data }">
            <span
              class="layout-default-nav-menu-title"
            > {{ data.meta?.title }} </span>
          </template>
        </VkRoutesMenuContent>
      </ElMenu>

      <VpThemeToggler></VpThemeToggler>
    </div>
  </div>
</template>

<style>
.layout-default-nav-menu-a{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: var(--el-color-primary);
}
</style>
