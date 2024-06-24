import { CrowdinFilePath } from '#/crowdin'
import { usePageContext } from 'vike-vue/usePageContext'

export {
  CrowdinFilePath,
}


export const useCrowdinFile = (
  path: CrowdinFilePath,
) => {
  const pageContext = usePageContext()
  return pageContext.crowdin[path]
}


export const useCrowdinLang = () => {
  const pageContext = usePageContext()
  return pageContext.lang
}
