import ElmentPlus, { ID_INJECTION_KEY } from 'element-plus'
import type { OnCreateAppAsync } from 'vike-vue/types'
import { VkClientOnly } from '@vunk/core/components/client-only'
import 'uno.css'
import '#/src/styles'


export const onCreateApp: OnCreateAppAsync = async (pageContext) => {
  const { app } = pageContext 
  app.use(ElmentPlus)
  app.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current: 0,
  })
  app.component('ClientOnly', VkClientOnly)
  
}


