<script lang="ts" setup>
import type { FirstParameter } from '@vunk-shared/types'
import type { __VkfButton, __VkfSelect } from '@vunk/form'
import { createProjectStartPrompt } from '@vunk-shared/ai/prompt'
import { setData } from '@vunk/core'
import { VkfForm, VkfFormItemRendererTemplate } from '@vunk/form'
import { VkfInputCollection } from '@vunk/form/components/input-collection'
import { ref } from 'vue'

type Row = FirstParameter<typeof createProjectStartPrompt>

const result = ref('')
const formData = ref({
  projectName: '3D 打砖块',
  keywords: ['Unity'],
  userSkills: [{
    skill: 'TypeScript',
    level: '高级',
  }],
} as Row)
const formItems = [
  {
    templateType: 'VkfInput',
    label: '项目名称',
    prop: 'projectName',
  },
  {
    templateType: 'VkfSelect',
    label: '关键词',
    prop: 'keywords',
    multiple: true,
    filterable: true,
    allowCreate: true,
  } as __VkfSelect.Source,
  {
    templateType: 'VkfInputCollection',
    label: '用户技能',
    prop: 'userSkills',
    columns: [
      {
        templateType: 'VkfInput',
        label: '技能',
        prop: 'skill',
      },
      {
        templateType: 'VkfSelect',
        label: '熟练度',
        prop: 'level',
        options: [
          { label: '入门', value: '入门' },
          { label: '熟练', value: '熟练' },
          { label: '专家', value: '专家' },
        ],
      },
    ],
  },

  {
    templateType: 'VkfButton',
    buttonLabel: '生成提示词',
    onClick: handleSubmit,
    type: 'primary',
  } as __VkfButton.Source,
]

async function handleSubmit () {
  const prompt = createProjectStartPrompt(formData.value)
  result.value = prompt
}
</script>

<template>
  <VkfForm
    :data="formData"
    :form-items="formItems"
    @set-data="setData(formData, $event)"
  >
    <template #rendererTemplate>
      <VkfFormItemRendererTemplate
        type="VkfInputCollection"
      >
        <template #default="{ props, value, input }">
          <VkfInputCollection
            :model-value="value"
            v-bind="props"
            @update:model-value="input"
          ></VkfInputCollection>
        </template>
      </VkfFormItemRendererTemplate>
    </template>
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
