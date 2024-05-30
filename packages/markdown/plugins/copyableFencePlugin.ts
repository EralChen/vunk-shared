
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
      `<button  class="copy"></button>` +
      `<span class="lang">${lang}</span>` +
      fence?.(...args) +
      '</div>'
    )
  }
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
