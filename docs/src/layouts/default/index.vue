<script lang="ts" setup>
import { VkDuplex } from '@vunk/core'
import { ElScrollbar } from 'element-plus'
import Navbar from './navbar.vue'
import Aside from './aside.vue'
import Toc from './toc.vue'

</script>
<template>
  <VkDuplex class="layout-default">
    <template #one>
      <div class="layout-default-header">
        <Navbar></Navbar>
      </div>
    </template>

    <div
      sk-flex
      class="h-100%"
    >
      <div class="layout-default-aside-x">
        <div class="layout-default-aside">
          <Aside></Aside>
        </div>
      </div>

      <VkDuplex 
        class="flex-1 overflow-hidden"
      >
        <ElScrollbar
          id="VPScrollView"
        >
          <main class="page-content">
            <div class="doc-content-wrapper">
              <div
                id="VPContent"
                class="doc-content-container"
              >
                <slot></slot>
              </div>
              <div class="doc-toc-container">
                <Toc></Toc>
              </div>
            </div>     
          </main>
        </ElScrollbar>
      </VkDuplex>
    </div>
  </VkDuplex>
</template>

<style>
html{
  height: 100%;
}
body, #app, #page-view {
  height: inherit;
}

</style>

<style>
.doc-toc-container{
  width: 300px;
  position: sticky;
  top: 0;
  height: 100%;
  overflow: auto;
  padding: var(--gap-page);
  background-color: var(--bg-color);
}
.doc-content-container{
  flex-grow: 1;
  padding-right: 64px;
}
.layout-default {
  --layout-aside-width: 300px;
}

.layout-default > .vk-duplex-2 {
  background-color: var(--bg-color);

}
.layout-default-header{
  height: 60px;
  border-bottom: var(--el-border-color) 1px solid;
}
.layout-default-aside{
  min-width: var(--layout-aside-width);
  height: 100%;
}


</style>


<style>
.layout-default-aside-x,
.layout-default {
  height: 100%;
}

.layout-default-main {
  width: 100%;
}
</style>