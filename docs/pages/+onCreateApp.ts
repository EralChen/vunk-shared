import ElmentPlus from 'element-plus'
import type { OnCreateAppSync } from 'vike-vue'



export const onCreateApp: OnCreateAppSync = (pageContext) => {
  const { app } = pageContext 
  app.use(ElmentPlus)
}

