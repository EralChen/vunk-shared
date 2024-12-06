import { fromMarkdown } from 'mdast-util-from-markdown'
import { scriptSetupRE } from '@vunk-shared/regexp/vue'
import type { Html } from 'mdast'


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
    transform (code: string, id: string) {

      if (!id.endsWith('.md')) return ''
      const tree = fromMarkdown(code)

      const setupNode = tree.children.find(item => {
        // 类型为html，且匹配 script setup
        return item.type === 'html' 
          && scriptSetupRE.test(item.value)
      }) as Html | undefined

      if (!setupNode) {


        const setupCode = [
          '<script setup>',
          ...leadingCode,
          ...trailingCode,
          '</script>',
          '', // 末尾空行
        ].join('\n')

        return setupCode + code
      } 


      let setupHtml = setupNode.value

      // 获取 code 中 setupNode 文本位置
      const start = setupNode.position?.start.offset
      const end = setupNode.position?.end.offset


      setupHtml = setupHtml.replace(scriptSetupRE, (_, attr1, attr2, code) => {
        const attr = `${attr1} ${attr2}`.trim()
        const codeArr =  [
          `<script setup ${attr}>`,
          ...leadingCode,
          code,
          ...trailingCode,
          '</script>',
        ].filter(Boolean)

        // 末尾空行
        codeArr.push('')

        return codeArr.join('\n')
      })

      setupNode.value = setupHtml

      if (start === undefined || end === undefined) {
        // eslint-disable-next-line no-console
        console.warn('setupNode position is undefined')
        return code
      }

      return code.slice(0, start) + setupHtml + code.slice(end)
    },
  }

}