import ElmentPlus from 'element-plus'
import type { OnCreateAppAsync } from 'vike-vue/types'
import 'uno.css'
import '#/src/styles'


export const onCreateApp: OnCreateAppAsync = async (pageContext) => {
  const { app } = pageContext 
  app.use(ElmentPlus)
}


