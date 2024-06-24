/* eslint-disable no-console */
// ref: https://github.com/vikejs/vike-vue/blob/main/packages/vike-vue/src/renderer/createVueApp.ts
export { createVueApp }
export type { ChangePage }

import { type App, createApp, createSSRApp, h, nextTick, shallowRef, shallowReactive } from 'vue'
import type { PageContext } from 'vike/types'
import { setPageContext } from 'vike-vue/usePageContext'
import { callCumulativeHooks } from '../plain/src/callCumulativeHooks'
import { isPlainObject, objectAssign } from '@vunk-shared/object'
import { setData } from 'vike-vue/useData'
import { contentUpdatedCallbacks, type ContentUpdatedCallbackHook } from '@vunk-shared/vike/vue/hooks/contentUpdatedCallbacks'


type ChangePage = (pageContext: PageContext) => Promise<void>
async function createVueApp (pageContext: PageContext, ssr: boolean, mainComponentName: 'Head' | 'Page') {

  const runCbs = (hook: ContentUpdatedCallbackHook) => {
    contentUpdatedCallbacks
      .filter((obj) => obj.hook === hook)
      .forEach((obj) => obj.callback(pageContext))
  }
  const propsWithHooks = {
    onVnodeMounted: () => runCbs('mounted'),
    onVnodeUpdated: () => runCbs('updated'),
    onVnodeUnmounted: () => runCbs('unmounted'),
    onVnodeBeforeUnmount: () => runCbs('beforeUnmount'),
  }

  const mainComponentRef = shallowRef(pageContext.config[mainComponentName])
  const layoutRef = shallowRef(pageContext.config.Layout || [])

  const MainComponent = () => h(mainComponentRef.value, propsWithHooks)

  let RootComponent = MainComponent
  // Wrap <Page> with <Layout>
  if (mainComponentName === 'Page') {
    RootComponent = () => {
      let RootComp = MainComponent
      layoutRef.value.forEach((layout) => {
        const Comp = RootComp
  
        RootComp = () => h(layout, null, Comp)
      })
      return RootComp()
    }
  }

  const app: App = ssr ? createSSRApp(RootComponent) : createApp(RootComponent)
  objectAssign(pageContext, { app })

  // changePage() is called upon navigation, see +onRenderClient.ts
  const changePage: ChangePage = async (pageContext: PageContext) => {
    let returned = false
    let err: unknown
    app.config.errorHandler = (err_) => {
      if (returned) {
        console.error(err_)
      } else {
        err = err_
      }
    }
    const data = pageContext.data ?? {}
    assertDataIsObject(data)
    objectReplace(dataReactive, data)
    objectReplace(pageContextReactive, pageContext)
    mainComponentRef.value = pageContext.config[mainComponentName]
    console.log('layoutRef.value', mainComponentRef.value)
    layoutRef.value = pageContext.config.Layout || []
    await nextTick()
    returned = true
    if (err) throw err
  }

  const data = pageContext.data ?? {}
  assertDataIsObject(data)
  const dataReactive = shallowReactive(data)
  const pageContextReactive = shallowReactive(pageContext)
  setPageContext(app, pageContextReactive)
  setData(app, dataReactive)

  const { onCreateApp } = pageContext.config
  await callCumulativeHooks(onCreateApp, pageContext)
  return { app, changePage }
}

function assertDataIsObject (data: unknown): asserts data is Record<string, unknown> {
  if (!isPlainObject(data)) throw new Error('Return value of data() should be a plain object, undefined, or null')
}

export function objectReplace (obj: object, objAddendum: object) {
  Object.keys(obj).forEach((key) => delete obj[key])
  Object.assign(obj, objAddendum)
}

