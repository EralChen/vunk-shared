<script lang="ts" setup>
import type { FirstParameter } from '@vunk-shared/types'
import type { FormInstance, FormRules } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { createProjectStartPrompt } from '@vunk-shared/openai/prompt'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

type Row = FirstParameter<typeof createProjectStartPrompt>

const formRef = ref<FormInstance>()
const loading = ref(false)
const result = ref('')

const formData = ref({
  projectName: '',
  keywords: [''],
  userSkills: [{
    skill: '',
    level: '入门',
  }],
} as Row)

const rules = ref<FormRules>({
  'projectName': [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
  ],
  'keywords': [
    { required: true, message: '请至少添加一个关键词', trigger: 'blur' },
  ],
  'keywords.0': [
    { required: true, message: '关键词不能为空', trigger: 'blur' },
  ],
  'userSkills': [
    { required: true, message: '请至少添加一个技能', trigger: 'blur' },
  ],
  'userSkills.0.skill': [
    { required: true, message: '技能名称不能为空', trigger: 'blur' },
  ],
})

function addKeyword () {
  formData.value.keywords.push('')
}

function removeKeyword (index: number) {
  formData.value.keywords.splice(index, 1)
}

function addSkill () {
  formData.value.userSkills.push({
    skill: '',
    level: '入门',
  })
}

function removeSkill (index: number) {
  formData.value.userSkills.splice(index, 1)
}

async function handleSubmit (form: FormInstance | undefined) {
  if (!form)
    return

  try {
    await form.validate()
    loading.value = true
    const prompt = createProjectStartPrompt(formData.value)
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
    <el-form-item label="项目名称" prop="projectName">
      <el-input v-model="formData.projectName" placeholder="请输入项目名称" />
    </el-form-item>

    <el-form-item label="关键词">
      <div v-for="(keyword, index) in formData.keywords" :key="index" class="keyword-item">
        <el-form-item :prop="`keywords.${index}`" :rules="rules['keywords.0']">
          <el-input v-model="formData.keywords[index]" placeholder="请输入关键词">
            <template #append>
              <el-button :disabled="formData.keywords.length === 1" @click="removeKeyword(index)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </div>
      <el-button @click="addKeyword">
        添加关键词
      </el-button>
    </el-form-item>

    <el-form-item label="技能水平">
      <div v-for="(skill, index) in formData.userSkills" :key="index" class="skill-item">
        <div class="skill-inputs">
          <el-form-item :prop="`userSkills.${index}.skill`" :rules="rules['userSkills.0.skill']" class="skill-name">
            <el-input v-model="skill.skill" placeholder="请输入技能名称" />
          </el-form-item>
          <el-form-item :prop="`userSkills.${index}.level`" class="skill-level">
            <el-select v-model="skill.level">
              <el-option label="入门" value="入门" />
              <el-option label="中级" value="中级" />
              <el-option label="高级" value="高级" />
            </el-select>
          </el-form-item>
          <el-button :disabled="formData.userSkills.length === 1" @click="removeSkill(index)">
            <el-icon><Delete /></el-icon>
          </el-button>
        </div>
      </div>
      <el-button @click="addSkill">
        添加技能
      </el-button>
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

.keyword-item {
  margin-bottom: 10px;
}

.skill-item {
  margin-bottom: 10px;
}

.skill-inputs {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.skill-name {
  flex: 2;
  margin-bottom: 0;
}

.skill-level {
  flex: 1;
  margin-bottom: 0;
}
</style>
