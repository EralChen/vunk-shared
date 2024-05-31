

/**
 * Load a style string into the document
 * @param css 
 * @returns 
 * @example
 * const remove = loadStyleString('body { background: red; }')
 */
export function loadStyleString (css: string) {
  const style = document.createElement('style')
  style.appendChild(document.createTextNode(css))
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(style)

  // remove
  return () => { style.parentNode === head && head.removeChild(style) }
}

