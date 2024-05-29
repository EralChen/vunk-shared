export * from './unocss-preferences'
export * from './markdown'
export * from './explorer'

import { createMarkdownPlugin } from '@vunk-shared/vite/config'
import { demoContainerPlugin as mdDemoContainerPlugin } from '@vunk-shared/markdown/plugins'

export {
  createMarkdownPlugin,
  mdDemoContainerPlugin,
}