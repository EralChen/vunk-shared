/* eslint-disable no-console */
 
// ref: https://github.com/vikejs/vike-vue/blob/main/packages/vike-vue/src/integration/createVueApp.ts
export { createVueApp }
export type { ChangePage }

import { type App, createApp, createSSRApp, h, nextTick, shallowRef, shallowReactive, Component, Fragment, VNode } from 'vue'
import type { PageContext } from 'vike/types'
import { setPageContext } from 'vike-vue/usePageContext'
import { callCumulativeHooks } from '../plain/src/callCumulativeHooks'
import { isPlainObject, objectAssign } from '@vunk-shared/object'
import { setData } from 'vike-vue/useData'
import { contentUpdatedCallbacks, type ContentUpdatedCallbackHook } from '@vunk-shared/vike/vue/hooks/contentUpdatedCallbacks'
import type { PageContextInternal } from 'vike-vue/dist/types/PageContext'


type ChangePage = (pageContext: PageContext) => Promise<void>
async function createVueApp (
  pageContext: PageContext & PageContextInternal, 
  ssr: boolean, 
  entryComponentName: 'Head' | 'Page',
) {

  const runCbs = (hook: ContentUpdatedCallbackHook) => {
    contentUpdatedCallbacks
      .filter((obj) => obj.hook === hook)
      .forEach((obj) => obj.callback(pageContext))
  }

  /**
   * @description 添加全局钩子
   * @example
   * const EntryComponent = () => h(entryComponentRef.value, propsWithHooks) 
   */
  const propsWithHooks = {
    onVnodeMounted: () => runCbs('mounted'),
    onVnodeUpdated: () => runCbs('updated'),
    onVnodeUnmounted: () => runCbs('unmounted'),
    onVnodeBeforeUnmount: () => runCbs('beforeUnmount'),
  }

  let onChangePage: undefined | ((pageContext: PageContext) => void)
  let RootComponent: Component | (() => ReturnType<typeof h>)

  // Wrap <Page> with <Layout>
  if (entryComponentName === 'Page') {
    const entryComponentRef = shallowRef(pageContext.config[entryComponentName])
    const layoutRef = shallowRef(pageContext.config.Layout || [])
    onChangePage = (pageContext: PageContext) => {
      entryComponentRef.value = pageContext.config[entryComponentName]
      layoutRef.value = pageContext.config.Layout || []
    }
    const EntryComponent = () => h(entryComponentRef.value, propsWithHooks)
    RootComponent = () => {
      let RootComp = EntryComponent
      layoutRef.value.forEach((layout) => {
        const Comp = RootComp
        RootComp = () => h(layout, null, Comp)
      })
      return RootComp()
    }
  } else {
    RootComponent = () => {

      let Head:VNode[] = []
      if (pageContext.config.Head) {
        Head = Array.isArray(pageContext.config.Head) 
          ? pageContext.config.Head 
          : [pageContext.config.Head];
      }
      const HeadElements = [
        // Added by +Head
        ...Head,
        // Added by useConfig()
        ...(pageContext._configFromHook?.Head ?? []),
      ].map((HeadComponent) => h(HeadComponent))
      return h(Fragment, null, HeadElements)
    }
  }

  const app: App = ssr ? createSSRApp(RootComponent) : createApp(RootComponent)
  objectAssign(pageContext, { app })
  const { onCreateApp } = pageContext.config
  await callCumulativeHooks(onCreateApp, pageContext)

  const data = pageContext.data ?? {}
  assertDataIsObject(data)

  // TODO/breaking-change: use shallowRef() instead of shallowReactive()
  // - Remove workaround https://github.com/vikejs/vike-vue/blob/89ca09ed18ffa1c0401851a506f505813a7dece7/packages/vike-vue/src/integration/onRenderClient.ts#L18-L21
  const dataReactive = shallowReactive(data)
  const pageContextReactive = shallowReactive(pageContext)
  setPageContext(app, pageContextReactive)
  setData(app, dataReactive)

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
    onChangePage?.(pageContext)
    await nextTick()
    returned = true
    if (err) throw err
  }

  return { app, changePage }
}

function assertDataIsObject (data: unknown): asserts data is Record<string, unknown> {
  if (!isPlainObject(data)) throw new Error('Return value of data() should be a plain object, undefined, or null')
}

export function objectReplace (obj: object, objAddendum: object) {
  Object.keys(obj).forEach((key) => delete obj[key])
  Object.assign(obj, objAddendum)
}

