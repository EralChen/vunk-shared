import ElmentPlus from 'element-plus'
import { VkClientOnly } from '@vunk/core/components/client-only'
import type { OnCreateAppSync } from 'vike-vue'
import { DemoContainer } from '@vunk-shared/markdown/components'



export const onCreateApp: OnCreateAppSync = (pageContext) => {
  const { app } = pageContext 
  app.use(ElmentPlus)
  app.component('Demo', DemoContainer)
  app.component('ClientOnly', VkClientOnly)

}

