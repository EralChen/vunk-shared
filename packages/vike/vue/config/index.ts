import { Config } from 'vike/types'
import { ssrEffect } from '../../plain/src/ssrEffect'

export default {

  onRenderClient: process.env.ROLLUP_BUILD 
    ? 'import:@vunk/shared/vike/vue/onRenderClient:onRenderClient'
    : 'import:@vunk-shared/vike/vue/onRenderClient:onRenderClient',
  onRenderHtml: process.env.ROLLUP_BUILD 
    ? 'import:@vunk/shared/vike/vue/onRenderHtml:onRenderHtml' 
    : 'import:@vunk-shared/vike/vue/onRenderHtml:onRenderHtml',


  // https://vike.dev/passToClient
  // It is a cumulative config option, so a web app using vike-vue can extend
  // this list.
  passToClient: ['fromHtmlRenderer', '_configFromHook'],

  // https://vike.dev/clientRouting
  clientRouting: true,
  hydrationCanBeAborted: true,

  // https://vike.dev/meta
  meta: {
    Head: {
      env: { server: true },
      cumulative: true,
    },
    Layout: {
      env: { server: true, client: true },
      cumulative: true,
    },
    title: {
      env: { server: true, client: true },
    },
    description: {
      env: { server: true },
    },
    image: {
      env: { server: true },
    },
    viewport: {
      env: { server: true },
    },
    favicon: {
      env: { server: true },
      global: true,
    },
    lang: {
      env: { server: true, client: true },
    },
    ssr: {
      env: { config: true },
      effect: ssrEffect,
    },
    stream: {
      env: { server: true },
    },
    onCreateApp: {
      env: { server: true, client: true },
      cumulative: true,
    },
    onBeforeRenderHtml: {
      env: { server: true },
      cumulative: true,
    },
    onAfterRenderHtml: {
      env: { server: true },
      cumulative: true,
    },
    onBeforeRenderClient: {
      env: { server: false, client: true },
      cumulative: true,
    },
    onAfterRenderClient: {
      env: { server: false, client: true },
      cumulative: true,
    },
    bodyHtmlBegin: {
      env: { server: true },
      cumulative: true,
      global: true,
    },
    bodyHtmlEnd: {
      env: { server: true },
      cumulative: true,
      global: true,
    },
    htmlAttributes: {
      env: { server: true },
      global: true,
      cumulative: true, // for Vike extensions
    },
    bodyAttributes: {
      env: { server: true },
      global: true,
      cumulative: true, // for Vike extensions
    },
  },
} satisfies Config

