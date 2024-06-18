import type { Token } from 'markdown-it'

/**
 * @description 
 * 获取容器内的主要内容
 * @param tokens 
 * @param idx 
 * @param klass
 * @example
 * ```ts
 * render (tokens: Token[], idx: number) {
 *  getMaincontentInContainer(tokens, idx)
 * }
 * ```
 * ```md
 * :::demo
 * test/demo
 * >>>label
 * subcontent
 * >>>
 * :::
 * => test/demo
 * ```
 */
export function getMaincontentInContainer (
  tokens: Token[],
  idx: number,
  klass: string,
) {

  let tokenIndex = idx

  let currentInlineToken: Token|null = null


  while (
    !currentInlineToken &&
    ![`container_${klass}_close`].includes(tokens[tokenIndex]?.type)
  ) {
    const token = tokens[tokenIndex]
   
    if (token.type === 'inline') {


      const openToken = tokens[tokenIndex - 2]
      const closeToken = tokens[tokenIndex + 2]

      if (
        openToken?.type === `container_${klass}_open`
      ) {
        currentInlineToken = token
      }

      if (
        openToken?.nesting === 1 
        && closeToken?.nesting === -1
        && openToken.tag === closeToken.tag
      ) {} else {  // main content 不在其他 open close 之间
        currentInlineToken = token
      }

    }

    if (!currentInlineToken) {
      tokenIndex++
    }

  }

  if (currentInlineToken) {
    return currentInlineToken.content
  }
 

}

