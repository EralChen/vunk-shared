import { PageContext } from 'vike/types'
import { rCrowdinFilesAsReflect } from '#/crowdin'

export async function onAfterRenderHtml (pageContext: PageContext) {
  const lang = pageContext.lang
  pageContext.crowdin = await rCrowdinFilesAsReflect(lang)

}
