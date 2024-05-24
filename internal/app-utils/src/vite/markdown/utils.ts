import type Token from 'markdown-it/lib/token.mjs'

/**
 * @description: get sub blockquote content
 * >>>xxx
 * content
 * >>>
 */
export function getSubBlockquoteContent (
  tokens: Token[],
  tokenIndex: number,
  name: string,
) {

  while (tokens[tokenIndex] && !['blockquote_open', 'container_demo_close'].includes(tokens[tokenIndex].type)) {
    tokenIndex++
  }
  let currentToken = tokens[tokenIndex]
  if (
    currentToken?.type === 'blockquote_open' 
            && currentToken.nesting === 1
  ) {
    currentToken = tokens[tokenIndex + 4]
                    
    if (currentToken.type === 'inline') {
      const re = new RegExp(`^${name}\\s*(.+)`)
      const m = currentToken.content.match(re)
      const content = m && m.length > 1 ? m[1] : ''
      return content
    }
    
  }
  return ''
  /* end of before add  */
}