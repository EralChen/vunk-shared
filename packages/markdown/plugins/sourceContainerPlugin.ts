import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import { ContainerPluginWithParams } from './types'
import fs from 'fs'
import path from 'path'
import { existentFilepath } from '@vunk-shared/node/path'

export interface SourceContainerPluginSettings {
  /**
   * @description
   * 源码根目录
   * */
  root: string

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
  const extensions = options?.extnames || ['ts', 'vue', 'js', 'tsx','jsx']
  const klass = 'source'
 
  const args = [
    container,
    klass,
    {
    
      render (
        tokens, idx,
      ) {
        const token = tokens[idx]

        if (token.nesting === 1) {

          const sourceFileToken = tokens[idx + 2]
          const sourceFile = sourceFileToken.children?.[0].content ?? ''
    
          if (!sourceFile) {
            return ''
          }
          // 判断 sourceFile 有没有后缀名
          const filepath = existentFilepath(
            path.resolve(root, sourceFile),
            extensions,
          )
          if (!filepath) {
            return ''
          }
          const source = fs.readFileSync(filepath).toString().replaceAll('```', '\\`\\`\\`')
          
          const prerenderSource = [
            '```' + path.extname(filepath).slice(1),
            source,
            '```',
          ].join('\n')

          return md.render(prerenderSource, {
            // ...env,
            __vunk_noMarkdownSetupInject: true,
          })
        } else {
          return ``
        }
      },
    },
  ] as ContainerPluginWithParams

  md.use(...args)

}