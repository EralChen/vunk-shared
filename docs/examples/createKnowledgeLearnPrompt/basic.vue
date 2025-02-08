<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { createKnowledgeLearnPrompt } from '@vunk-shared/openai/prompt'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const formRef = ref<FormInstance>()
const loading = ref(false)
const result = ref('')

const formData = ref({
  subject: '',
  topic: '',
})

const rules: FormRules = {
  subject: [{ required: true, message: '请输入学科', trigger: 'blur' }],
  topic: [{ required: true, message: '请输入话题', trigger: 'blur' }],
}

async function handleSubmit (form: FormInstance | undefined) {
  if (!form)
    return

  try {
    await form.validate()
    loading.value = true
    const prompt = createKnowledgeLearnPrompt(formData.value)
    result.value = prompt
  }
  catch {
    ElMessage.error('表单验证失败')
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-width="120px"
    class="form"
  >
    <el-form-item label="学科" prop="subject">
      <el-input v-model="formData.subject" placeholder="请输入学科，如：JavaScript" />
    </el-form-item>

    <el-form-item label="话题" prop="topic">
      <el-input v-model="formData.topic" placeholder="请输入话题，如：Promise" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="handleSubmit(formRef)">
        生成提示词
      </el-button>
    </el-form-item>
  </el-form>

  <div v-if="result" class="result">
    <h3>生成的提示词：</h3>
    <pre>{{ result }}</pre>
  </div>
</template>

<style scoped>
.form {
  max-width: 600px;
  margin-bottom: 20px;
}

.result {
  margin-top: 20px;
}

.result pre {
  white-space: pre-wrap;
  background: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
}
</style>
