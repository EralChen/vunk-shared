// https://vike.dev/onRenderClient
export { onRenderClient }

import { createVueApp } from './createVueApp.js'
import { getHeadSetting } from '#/vike-vue/renderer/getHeadSetting'
import type { OnRenderClientAsync } from 'vike/types'
import type { VikeVueApp } from 'vike-vue/dist/types/PageContext'


import { useCopyCode } from '../vitepress/composables/copy-code'


// 初始化代码复制功能
useCopyCode()





let app: VikeVueApp | undefined = undefined
const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  if (!app) {
    // First rendering/hydration

    const container = document.getElementById('vue-root')!
    const ssr = container.innerHTML !== ''
    const ctxWithApp = await createVueApp(pageContext, ssr, 'Page')
    app = ctxWithApp.app

    // Do this in two steps to allow users to access plugins in their onBeforeMountApp hook
    pageContext.config.onBeforeMountAppPinia?.(ctxWithApp)
    pageContext.config.onBeforeMountAppVueQuery?.(ctxWithApp)

    await pageContext.config.onBeforeMountApp?.(ctxWithApp)

    app.mount(container)
  } else {
    // Client-side navigation

    await app.changePage(pageContext)

    const title = getHeadSetting('title', pageContext) || ''
    const lang = getHeadSetting('lang', pageContext) || 'zh-CN'
    const favicon = getHeadSetting('favicon', pageContext)

    if (title !== undefined) document.title = title
    if (lang !== undefined) document.documentElement.lang = lang
    if (favicon !== undefined) setFavicon(favicon)
  }
}

// https://stackoverflow.com/questions/260857/changing-website-favicon-dynamically/260876#260876
function setFavicon (faviconUrl: string | null) {
  let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']")
  if (!faviconUrl) {
    if (link) document.head.removeChild(link)
    return
  }
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = faviconUrl
}
