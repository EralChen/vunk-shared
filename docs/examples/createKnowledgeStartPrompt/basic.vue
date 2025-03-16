<script lang="ts" setup>
import type { __VkfForm } from '@vunk/form'
import { createKnowledgeStartPrompt } from '@vunk-shared/ai/prompt'
import { setData } from '@vunk/core'
import { VkfForm } from '@vunk/form'
import { ref } from 'vue'

const result = ref('')

const formData = ref({
  subject: 'Javascript 的 LangGraph',
  weeks: 3,
})

const formItems: __VkfForm.FormItem[] = [
  {
    templateType: 'VkfInput',
    label: '学科',
    prop: 'subject',
  },
  {
    templateType: 'VkfInputNumber',
    label: '周数',
    prop: 'weeks',
    min: 1,
    max: 52,
  },
]

async function handleSubmit () {
  const prompt = createKnowledgeStartPrompt(formData.value)
  result.value = prompt
}
</script>

<template>
  <VkfForm
    :form-items="formItems"
    :data="formData"
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
