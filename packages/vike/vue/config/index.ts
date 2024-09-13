import vikeVue from 'vike-vue/config'
import { Config } from 'vike/types'

export default {
  name: 'vike-vue-plus',
  require: {
    vike: '>=0.4.172',
  },

  onRenderClient: process.env.ROLLUP_BUILD 
    ? 'import:@vunk/shared/vike/vue/onRenderClient:onRenderClient'
    : 'import:@vunk-shared/vike/vue/onRenderClient:onRenderClient',
  onRenderHtml: process.env.ROLLUP_BUILD 
    ? 'import:@vunk/shared/vike/vue/onRenderHtml:onRenderHtml' 
    : 'import:@vunk-shared/vike/vue/onRenderHtml:onRenderHtml',


  passToClient: vikeVue.passToClient,

  // https://vike.dev/clientRouting
  clientRouting: true,
  hydrationCanBeAborted: true,

  // https://vike.dev/meta
  meta: {
    ...vikeVue.meta,
    onBeforeRenderHtml: {
      env: { server: true, client: false },
      cumulative: true,
    },
  },
} satisfies Config

