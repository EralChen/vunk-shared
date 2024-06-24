import Layout from '#s/layouts/default/index.vue'
import type { Config } from 'vike/types'
import vikeVue from 'vike-vue/config'

export default {
  Layout,

  onRenderClient: 'import:@vunk-shared/vike/vue/onRenderClient:onRenderClient',
  onRenderHtml: 'import:@vunk-shared/vike/vue/onRenderHtml:onRenderHtml',


  extends: [
    vikeVue,
  ],
} satisfies Config