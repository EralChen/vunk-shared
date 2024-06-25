import { CrowdinFilePath } from '#/renderer/crowdin'
import { usePageContext } from 'vike-vue/usePageContext'

export {
  CrowdinFilePath,
}


export const useCrowdinFile = (
  path: CrowdinFilePath,
) => {
  const pageContext = usePageContext()
  return pageContext.crowdin?.[path]
}
