import { CrowdinFilePath } from '#/shared'
import { usePageContext } from 'vike-vue/usePageContext'


export {
  CrowdinFilePath,
}

export function useCrowdinFile (path: CrowdinFilePath) {
  const pageContext = usePageContext()
  const data = pageContext.crowdin[path]
  return data
}

