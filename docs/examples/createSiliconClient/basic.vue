<script lang="ts" setup>
import { createSiliconClient } from '@vunk-shared/openai'
import { BubbleList, Sender, useXAgent, useXChat } from 'ant-design-x-vue'
import { ref } from 'vue'

const client = createSiliconClient({
  apiKey: '',
  dangerouslyAllowBrowser: true,
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

  <Sender
    v-model:value="inputText"
    @submit="submit"
  >
  </Sender>
</template>
