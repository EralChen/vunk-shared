import { PageContext } from 'vike/types'

export type ContentUpdatedCallbackHook = 'mounted' | 'updated' | 'unmounted' | 'beforeUnmount'

export type ContentUpdatedCallback = (pageContext: PageContext) => void
