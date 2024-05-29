
/**
 *
 * @description 正则匹配 script setup
 * @link https://github.com/unplugin/unplugin-vue-markdown/blob/825ffc0d780f16297e48b9a27a278d7b72146408/src/core/markdown.ts#L9
 * 
 * @example
 * ```ts
 * function extractScriptSetup(html: string) {
  const scripts: ScriptMeta[] = []
  html = html.replace(scriptSetupRE, (_, attr1, attr2, code) => {
    scripts.push({
      code,
      attr: `${attr1} ${attr2}`.trim(),
    })
    return ''
  })

  return { html, scripts }
}

 * ```
 */
export const scriptSetupRE = /<\s*script([^>]*)\bsetup\b([^>]*)>([\s\S]*)<\/script>/mg


