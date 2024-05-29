import baseAnchorPlugin from 'markdown-it-anchor'
import type MarkdownIt from 'markdown-it'
import type { Token } from 'markdown-it'
import { slugify } from '@mdit-vue/shared'


/**
 * @description
 *  这是一个自定义的 Markdown 插件，用于在 Markdown 文档中为标题自动生成锚点和链接。
 *  它扩展了 `markdown-it-anchor` 插件，提供了自定义的 slugify 函数和链接的渲染方式。
 * @param md 
 * 
 * @example
 * ```ts
 * md.use(anchorPlugin)
 * ```
 */
export const anchorPlugin = (
  md: MarkdownIt,
) => {
  md.use(baseAnchorPlugin, {
    slugify,
    permalink: baseAnchorPlugin.permalink.linkInsideHeader({
      symbol: '&ZeroWidthSpace;',
      renderAttrs: (slug, state) => {
        // Find `heading_open` with the id identical to slug
        const idx = state.tokens.findIndex((token: Token) => {
          const attrs = token.attrs
          const id = attrs?.find((attr) => attr[0] === 'id')
          return id && slug === id[1]
        })
        // Get the actual heading content
        const title = state.tokens[idx + 1].content
        return {
          'aria-label': `Permalink to "${title}"`,
        }
      },
      
    }),
  })

}
