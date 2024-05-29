import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import { ContainerPluginWithParams } from './types'
import { MarkdownEnv } from 'vitepress'

/**
 * custom container plugin
 * @param md markdown-it instance
 * @param klass class name of the container
 * @returns 
 * 
 * @example
 * ```ts
  const containers = ['tip', 'warning', 'danger', 'info']
  containers.forEach(klass => {
  md.use(customContainerPlugin, klass)
  })
 ```
 */
export function customContainerPlugin (
  md: MarkdownIt,
  klass: string,
) {
 
  const args = [
    container,
    klass,
    {
      render (
        tokens, idx, _options, 
        env: MarkdownEnv & { references?: any },
        self,
      ) {
        const token = tokens[idx]
        const info = token.info.trim().slice(klass.length).trim()
        const attrs = self.renderAttrs(token)
        
        if (token.nesting === 1) {
          const title = md.renderInline(info, {
            references: env.references,
          })
          return [
            `<div class="${klass} custom-block"${attrs}>`,
            ` <p class="custom-block-title">${title}</p>`,
          ].join('\n')
        } else {
          return `</div>\n`
        }
      },
    },
  ] as ContainerPluginWithParams

  md.use(...args)

}