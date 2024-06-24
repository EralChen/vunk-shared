import { isCallable } from '@vunk-shared/function'
import { PageContext } from 'vike/types'

type Hook = (pageContext: PageContext) => unknown
type PlainHook = unknown

export function callCumulativeHooks<T extends Hook | PlainHook, C extends PageContext> (
  hooks: T[] | undefined,
  pageContext: C,
) {
  return Promise.all(
    hooks?.map(
      (hook) => (
        isCallable(hook)
          ? hook(pageContext) 
          : hook
      ),
    ) 
    ?? [])
}
