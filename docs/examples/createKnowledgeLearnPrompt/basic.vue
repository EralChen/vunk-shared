<script lang="ts" setup>
import type { __VkfForm } from '@vunk/form'
import { createKnowledgeLearnPrompt } from '@vunk-shared/ai/prompt'
import { setData } from '@vunk/core'
import { VkfForm } from '@vunk/form'
import { ref } from 'vue'

const result = ref('')

const formData = ref({
  subject: 'JavaScript',
  topic: 'LangGraph',
})

const formItems: __VkfForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    label: '主题',
    prop: 'subject',
  },
  {
    templateType: 'VkfInput',
    label: '话题',
    prop: 'topic',
  },
]

async function handleSubmit () {
  result.value = createKnowledgeLearnPrompt(formData.value)
}
</script>

<template>
  <VkfForm
    :data="formData"
    :form-items="formItems"
    @set-data="setData(formData, $event)"
  >
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">
        生成提示词
      </el-button>
    </el-form-item>
  </VkfForm>

  <div v-if="result" class="result">
    <h3>生成的提示词：</h3>
    <pre>{{ result }}</pre>
  </div>
</template>

<style scoped>
.result pre {
  white-space: pre-wrap;
  background: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
}
</style>
