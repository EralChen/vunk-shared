<script setup lang="ts">
import { PropType, ref } from 'vue'
import {
  ElTabs,
  ElTabPane,
} from 'element-plus'
const props = defineProps({
  data: {
    type: Array as PropType<{
      path: string,
      source: string
    }[]>,
    required: true,
  },
})

const active = ref(props.data[0].path)

</script>

<template>
  <div class="vunk-shared-demo-codes">
    <ElTabs
      v-model="active"
      type="border-card"
    >
      <ElTabPane
        v-for="item of data"
        :key="item.path" 
        :name="item.path" 
        :label="item.path"
      >
        <div
          v-html="item.source"
        />
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<style>
.vunk-shared-demo-codes .el-tabs--border-card>.el-tabs__content {
  padding: 0;
}
.vunk-shared-demo-codes  div[class*="language-"] {
  margin: 0;
}

</style>