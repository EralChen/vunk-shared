import type { MaybeArray } from '@vunk-shared/types'
import type MarkdownIt from 'markdown-it'
import type { ContainerPluginWithParams } from './types'
import fs from 'node:fs'
import path from 'node:path'
import { existentFilepath } from '@vunk-shared/node/path'
import container from 'markdown-it-container'

export interface SourceContainerPluginSettings {
  /**
   * @description
   * 源码根目录
   */
  root: MaybeArray<string>

  /**
   * @description
   * 尝试匹配的文件名后缀列表
   */
  extnames?: string[]
}

export function sourceContainerPlugin (
  md: MarkdownIt,
  options?: SourceContainerPluginSettings,
) {
  const root = options?.root || process.cwd()
  const roots = Array.isArray(root) ? root : [root]

  const extensions = options?.extnames || ['ts', 'vue', 'js', 'tsx', 'jsx']
  const klass = 'source'

  const args = [
    container,
    klass,
    {

      render (
        tokens,
        idx,
      ) {
        const token = tokens[idx]

        if (token.nesting === 1) {
          const sourceFileToken = tokens[idx + 2]
          const sourceFile = sourceFileToken.children?.[0].content ?? ''

          if (!sourceFile) {
            return ''
          }

          let filepath: null | string = null
          for (let i = 0; i < roots.length; i++) {
            const current = existentFilepath(
              path.resolve(roots[i], sourceFile),
              extensions,
            )
            if (current) {
              filepath = current
              break
            }
          }

          if (!filepath) {
            return ''
          }
          const source = fs.readFileSync(filepath).toString().replaceAll('```', '\\`\\`\\`')

          const prerenderSource = [
            `\`\`\`${path.extname(filepath).slice(1)}`,
            source,
            '```',
          ].join('\n')

          return md.render(prerenderSource, {
            // ...env,
            __vunk_noMarkdownSetupInject: true,
          })
        }
        else {
          return ``
        }
      },
    },
  ] as ContainerPluginWithParams

  md.use(...args)
}
