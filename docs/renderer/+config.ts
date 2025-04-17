import { vikeVueConfig } from '@lib-env/app-utils'

export default {
  ...vikeVueConfig,

  onRenderClient: 'import:@vunk-shared/vike/vue/onRenderClient:onRenderClient',
  onRenderHtml: 'import:@vunk-shared/vike/vue/onRenderHtml:onRenderHtml',

  passToClient: [
    ...vikeVueConfig.passToClient,
    'crowdin',
  ],
  clientRouting: true,
  hydrationCanBeAborted: true,
}
