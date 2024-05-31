
import { markdownSetupInject } from '@vunk-shared/vite/markdown'
import type MarkdownIt from 'markdown-it'

/**
 * @link https://github.com/vuejs/vitepress/blob/1188951785fd2a72f9242d46dc55abb1effd212a/src/node/markdown/plugins/preWrapper.ts#L8
 * @param md  markdown-it 实例
 */
export function copyableFencePlugin (md: MarkdownIt) {



  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]

    // remove title from info
    token.info = token.info.replace(/\[.*\]/, '')

    const active = / active( |$)/.test(token.info) ? 'active' : ''
    token.info = token.info.replace(/ active$/, '').replace(/ active /, ' ')

    const lang = extractLang(token.info)

    
    return (
      `<div class="language-${lang} ${active}">` +
      `<button class="copy"></button>` +
      `<span class="lang">${lang}</span>` +
      fence?.(...args) +
      '</div>'
    )
  }

  md.core.ruler.before(
    'normalize', 
    'add_copy_code_script', 
    (state) => {
      const currentMdPath: string = state.env.id
      if (!currentMdPath) return
      

      const leadings = process.env.ROLLUP_BUILD 
        ? [
          `import { useCopyCode } from '@vunk/shared/markdown/plugins/copyableFence'`,
        ] 
        : [
          `import { useCopyCode } from '@vunk-shared/markdown/plugins/copyableFence'`,
        ]

      const mdSetupInject = markdownSetupInject({
        leadingCode: leadings,
        trailingCode: [
          'useCopyCode()',
        ],
      })

      state.src = mdSetupInject.transform(
        state.src, currentMdPath,
      )
    },
  )

}


function extractLang (info: string) {
  return info
    .trim()
    .replace(/=(\d*)/, '')
    .replace(/:(no-)?line-numbers({| |$|=\d*).*/, '')
    .replace(/(-vue|{| ).*$/, '')
    .replace(/^vue-html$/, 'template')
    .replace(/^ansi$/, '')
}
