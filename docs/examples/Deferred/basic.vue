<script lang="ts" setup>
import { AnyFunc } from '@vunk-shared/types'
import { Deferred } from '@vunk-shared/promise'
import { ref, shallowRef } from 'vue'
import { VkAsyncTeleport } from '@vunk/core'
const data = ref('title')
const show = ref(false)

const titleNodeDef = new Deferred<HTMLDivElement>()
const titleNodeRef = shallowRef<HTMLDivElement>()
titleNodeDef.promise.then((titleNode) => {
  titleNodeRef.value = titleNode
})

const getDialogNode:AnyFunc = (e: {
  dialogContentRef: {
    $el: HTMLDivElement
  }
}) => {

  if (!e?.dialogContentRef?.$el) {
    return
  }
  // get el-dialog__title
  const titleNode = e.dialogContentRef.$el.querySelector('.el-dialog__title')

  if (titleNode) {
    titleNodeDef.resolve(titleNode as HTMLDivElement)
  }
  
}

</script>
<template>
  <p>
    <ElButton
      @click="show = !show"
    >
      !show
    </ElButton>
  </p>
  
  <VkAsyncTeleport
    :await="titleNodeDef.promise"
    :to="titleNodeRef"
  >
    <div>{{ data }}</div>
  </VkAsyncTeleport>

  <ElDialog :ref="getDialogNode" v-model="show"></ElDialog>
</template>
