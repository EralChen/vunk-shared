

/**
 * @description
 *  Get the value of a CSS variable from the root element
 * @param key 
 * @returns 
 * @example
 * getRootStylePropertyValue('--color-primary')
 */
export function getRootStylePropertyValue (key: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(key)
    .trim()
}
