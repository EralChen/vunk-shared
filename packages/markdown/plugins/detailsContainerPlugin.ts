import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import { ContainerPluginWithParams } from './types'
import type { MarkdownEnv } from 'vitepress'

/**
 * 
 * @param md markdown-it instance
 * @returns 
 * 
 * @example
 ```ts
 md.use(detailsContainerPlugin)
 ```

```md
 :::details Click me
  Hello World
 :::
```
 */
export function detailsContainerPlugin (
  md: MarkdownIt,
) {
  const klass = 'details'
  
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
            `<details class="${klass} custom-block"${attrs}>`,
            ` <summary>${title}</summary>`,
          ].join('\n')
        } else {
          return `</details>\n`
        }
      },
    },
  ] as ContainerPluginWithParams

  md.use(...args)
}