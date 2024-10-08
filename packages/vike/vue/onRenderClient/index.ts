// ref: https://github.com/vikejs/vike-vue/blob/main/packages/vike-vue/src/integration/onRenderClient.ts


// https://vike.dev/onRenderClient
export { onRenderClient }

import { createVueApp, type ChangePage } from '../createVueApp'
import { getHeadSetting } from '../../plain/src/getHeadSetting'
import type { OnRenderClientAsync, PageContextClient } from 'vike/types'
import { callCumulativeHooks } from '../../plain/src/callCumulativeHooks'
import type { App } from 'vue'
import { objectAssign } from '@vunk-shared/object'
import type { PageContextInternal } from 'vike-vue/dist/types/PageContext'
import { applyHeadSettings } from '../../plain/src/applyHeadSettings'

let app: App | undefined
let changePage: ChangePage | undefined
const onRenderClient: OnRenderClientAsync = async (
  pageContext: PageContextClient & PageContextInternal,
): ReturnType<OnRenderClientAsync> => {

  // Workaround for https://github.com/vikejs/vike-vue/pull/178#issuecomment-2285852251b
  pageContext._configFromHook ??= {}
  // Workaround for https://github.com/vikejs/vike-vue/issues/181
  pageContext._headAlreadySetWrapper = { val: pageContext.isHydration }

  // Or eventually use https://github.com/vikejs/vike/issues/1776
  pageContext.isRenderingHead = undefined


  if (!app) {
    // First rendering/hydration

    const container = document.getElementById('app')!
    const ssr = container.innerHTML !== ''
    const res = await createVueApp(pageContext, ssr, 'Page')
    changePage = res.changePage
    app = res.app
    objectAssign(pageContext, { app })
    await callCumulativeHooks(pageContext.config.onBeforeRenderClient, pageContext)
    app.mount(container)

  } else {
    // Client-side navigation

    objectAssign(pageContext, { app })
    await callCumulativeHooks(pageContext.config.onBeforeRenderClient, pageContext)
    await changePage!(pageContext)
  }
  if (!pageContext.isHydration) {
    pageContext._headAlreadySetWrapper!.val = true
    applyHead(pageContext)
  }

}

function applyHead (pageContext: PageContextClient) {
  const title = getHeadSetting<string | null>('title', pageContext)
  const lang = getHeadSetting<string | null>('lang', pageContext)
  applyHeadSettings(title, lang)
}


