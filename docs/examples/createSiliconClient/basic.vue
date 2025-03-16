<script lang="ts" setup>
import { createSiliconClient } from '@vunk-shared/ai/openai'
import { VkfInput } from '@vunk/form'
import { Sender, useXAgent, useXChat } from 'ant-design-x-vue'
import { ref, watchEffect } from 'vue'

const apikey = ref('')
const client = createSiliconClient({
  apiKey: '',
  dangerouslyAllowBrowser: true,
})

watchEffect(() => {
  client.apiKey = apikey.value
})

const inputText = ref('')

const { agent } = useXAgent({
  async request (
    { message },
    { onUpdate, onSuccess },
  ) {
    if (!message)
      return

    const stream = await client.chat.completions.create({
      model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
      messages: message
        ? [
          { role: 'user', content: message },
        ]
        : [],
      stream: true,
    })
    let content: string = ''
    for await (const chunk of stream) {
      content += chunk.choices[0]?.delta?.content || ''
      onUpdate(content)
    }
    onSuccess(content)
  },
})

const { messages, onRequest } = useXChat({ agent: agent.value })

function submit (message: string) {
  onRequest(message)
  inputText.value = ''
}
</script>

<template>
  <pre>
    {{ messages }}
  </pre>

  <VkfInput
    v-model="apikey"
    label="Your API Key"
  >
  </VkfInput>

  <Sender
    v-model:value="inputText"
    @submit="submit"
  >
  </Sender>
</template>
