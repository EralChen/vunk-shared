import type { Token } from 'markdown-it'

/**
 * @description 
 * 获取容器内的子内容
 * @param tokens 
 * @param idx 
 * @param klass
 * @param label 
 * @example
 * ```ts
 * render (tokens: Token[], idx: number) {
 *  getSubcontentInContainer(tokens, idx, 'demo', 'label')
 * }
 * ```
 * ```md
 * :::demo
 * test/demo
 * >>>label
 * subcontent
 * >>>
 * :::
 * => subcontent
 * ```
 */
export function getSubcontentInContainer (
  tokens: Token[],
  idx: number,
  klass: string,
  label: string,
) {

  let subTokenIndex = idx
  while (
    !['blockquote_open']
      .includes(tokens[subTokenIndex].type)
  ) {
    if (
      subTokenIndex >= tokens.length ||
      tokens[subTokenIndex]?.type === `container_${klass}_close`
    ) {
      return ''
    }
    subTokenIndex++
  }
  let subToken = tokens[subTokenIndex]


  if (
    subToken?.type === 'blockquote_open' 
      && subToken.nesting === 1
  ) {
    subToken = tokens[subTokenIndex + 4]

    if (subToken.type === 'inline') {
      const subsRE = new RegExp(`^${label}(.*)\n([\\s\\S]+)`, 'm')
      const m = subToken.content.match(subsRE)
      const content = m && m.length > 2 ? m[2] : ''
      if (content) { 
        return content.trim()
      } else {
        return getSubcontentInContainer(
          tokens, subTokenIndex + 4, klass, label,
        )
      }
      
    }
  }

}

