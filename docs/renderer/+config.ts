import defaultConfig from '@vunk-shared/vike/vue/config'


export default {

  ...defaultConfig,
  
  onRenderClient: process.env.ROLLUP_BUILD 
    ? 'import:@vunk/shared/vike/vue/onRenderClient:onRenderClient'
    : 'import:@vunk-shared/vike/vue/onRenderClient:onRenderClient',
  onRenderHtml: process.env.ROLLUP_BUILD 
    ? 'import:@vunk/shared/vike/vue/onRenderHtml:onRenderHtml' 
    : 'import:@vunk-shared/vike/vue/onRenderHtml:onRenderHtml',

  passToClient: [
    ...defaultConfig.passToClient,
    'crowdin',
  ],

  // https://vike.dev/clientRouting
  clientRouting: true,
  hydrationCanBeAborted: true,


} as Config



