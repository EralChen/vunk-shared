

export { getHeadSetting }

import { isCallable } from '@vunk-shared/function'
import { ConfigFromHookResolved } from 'vike-vue/dist/types/Config'
import { PageContextInternal } from 'vike-vue/dist/types/PageContext'
import type { PageContext } from 'vike/types'
import { includes } from '@vunk-shared/array'
// import { configsCumulative } from 'vike-vue/config'
export const configsCumulative = ['Head', 'bodyAttributes', 'htmlAttributes'] as const

export type ConfigsCumulative = (typeof configsCumulative)[number]


// We use `any` instead of doing proper validation in order to save KBs sent to the client-side.

function getHeadSetting<T> (
  configName: keyof ConfigFromHookResolved,
  pageContext: PageContext & PageContextInternal,
): undefined | T {
  // Set by useConfig()
  const valFromUseConfig = pageContext._configFromHook?.[configName]
  // Set by +configName.js
  const valFromConfig = pageContext.config[configName]

  const getCallable = (val: unknown) => (isCallable(val) ? val(pageContext) : val)
  if (!includes(configsCumulative, configName)) {
    if (valFromUseConfig !== undefined) return valFromUseConfig as any
    return getCallable(valFromConfig) as any
  } else {
    return [
      //
      ...((valFromConfig as any) ?? []).map(getCallable),
      ...((valFromUseConfig as any) ?? []),
    ] as any
  }
}
