import { ContentUpdatedCallback, ContentUpdatedCallbackHook } from './types'

export const contentUpdatedCallbacks: {
  callback: ContentUpdatedCallback
  hook: ContentUpdatedCallbackHook
}[] = []

export type {
  ContentUpdatedCallback,
  ContentUpdatedCallbackHook,
}
