import { Plugin } from 'vite'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'
import { scriptSetupRE } from '@vunk-shared/regexp/vue'
import { Html } from 'mdast-util-from-markdown/lib'


export interface MarkdownSetupInjectSettings {
  name?: string
  leadingCode?: string[]
  trailingCode?: string[]
}

/**
 * markdownSetupInject
 * @description
 * 为 markdown 文件注入 script setup 代码
 * @param settings
  * @param settings.name 插件名称
  * @param settings.leadingCode 前置代码
  * @param settings.trailingCode 后置代码
 * @returns 
 * @example
 * ```ts
 *  const plugin = markdownSetupInject({
    leadingCode: [
      `import { defineAsyncComponent } from 'vue'`
    ],
    trailingCode: [
      `const CompontentTest = defineAsyncComponent(() => import('./ComponentTest.vue'))`,
    ]
  })
  ```
 */
export function markdownSetupInject (
  settings?: MarkdownSetupInjectSettings,
) {

  const leadingCode = settings?.leadingCode || []
  const trailingCode = settings?.trailingCode || []

  const name = settings?.name || 'vite-plugin-markdown-setup-inject'
  
  return {
    name,
    enforce: 'pre',
    async transform (code, id) {
      if (!id.endsWith('.md')) return
      const tree = fromMarkdown(code)

      const setupNode = tree.children.find(item => {
        // 类型为html，且匹配 script setup
        return item.type === 'html' 
          && scriptSetupRE.test(item.value)
      }) as Html | undefined

      if (!setupNode) {
        tree.children.unshift({
          type: 'html',
          value: [
            '<script setup>',
            ...leadingCode,
            ...trailingCode,
            '</script>',
          ].join('\n'),
        } as Html)
        return toMarkdown(tree)
      } 

      let setupHtml = setupNode.value
      setupHtml = setupHtml.replace(scriptSetupRE, (_, attr1, attr2, code) => {
        const attr = `${attr1} ${attr2}`.trim()
        return [
          `<script setup ${attr}>`,
          ...leadingCode,
          code,
          ...trailingCode,
          '</script>',
        ].filter(Boolean).join('\n')
      })

      setupNode.value = setupHtml

      return toMarkdown(tree)
    },
  } as Plugin

}