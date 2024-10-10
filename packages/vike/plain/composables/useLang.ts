import { usePageContext } from 'vike-vue/usePageContext'
import { getHeadSetting } from '../src/getHeadSetting'

export const useLang = () => {
  const pageContext = usePageContext()
  return getHeadSetting('lang', pageContext) as string
}


