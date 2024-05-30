export * from './unocss-preferences'
import { explorerTree } from '@vunk-shared/vite/plugins'
import { createMarkdownPlugin } from '@vunk-shared/vite/config'
import { copyableFencePlugin as mdCopyableFencePlugin } from '@vunk-shared/markdown/plugins'

export {
  createMarkdownPlugin,
  explorerTree,
  mdCopyableFencePlugin,
}