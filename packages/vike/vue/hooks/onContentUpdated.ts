
import { onUnmounted } from 'vue'
import { 
  type ContentUpdatedCallback, 
  type ContentUpdatedCallbackHook, 
  contentUpdatedCallbacks,
} from '@vunk-shared/vike/vue/hooks/contentUpdatedCallbacks'

/**
 * Register callback that is called every time the markdown content is updated
 * in the DOM.
 */
export function onContentUpdated (
  fn: ContentUpdatedCallback,
  options: { hooks: ContentUpdatedCallbackHook[] } = {
    hooks: ['mounted', 'updated', 'unmounted'],
  },
) {
  const { hooks } = options
  hooks.forEach((hook) => {
    contentUpdatedCallbacks.push({
      callback: fn,
      hook,
    })
  })
  onUnmounted(() => {
    contentUpdatedCallbacks.forEach((obj, index) => {
      if (obj.callback === fn) {
        contentUpdatedCallbacks.splice(index, 1)
      }
    })
  })
}



export {
  ContentUpdatedCallback, 
  ContentUpdatedCallbackHook, 
}