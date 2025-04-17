import type {
  DemoContainerPluginSettings,
  PropsContainerPluginSettings,
  SourceContainerPluginSettings,
} from '@vunk-shared/markdown/plugins'
import type { ReturnVoid } from '@vunk-shared/types'

import type { MarkdownItAsync } from 'markdown-it-async'
import type {} from 'vitepress'
import {
  anchorPlugin,
  copyableFencePlugin,
  customContainerPlugin,
  demoContainerPlugin,
  detailsContainerPlugin,
  linkPlugin,
  propsContainerPlugin,
  sourceContainerPlugin,
} from '@vunk-shared/markdown/plugins'
import {
  highlight as createHighlighter,
} from '@vunk-shared/markdown/shiki'
import markdown from 'unplugin-vue-markdown/vite'

const customBlocks = [
  'tip',
  'warning',
  'danger',
  'info',
]

export interface CreateMarkdownPluginSettings {
  base: string
  demoContainerPluginSettings?: DemoContainerPluginSettings
  sourceContainerPluginSettings?: SourceContainerPluginSettings

  propsContainerPluginSettings?: PropsContainerPluginSettings

  markdownItSetup?: (MarkdownIt: MarkdownItAsync) => ReturnVoid
}

export async function createMarkdownPlugin (settings: CreateMarkdownPluginSettings) {
  const demoContainerPluginSettings = settings.demoContainerPluginSettings
  const sourceContainerPluginSettings = settings.sourceContainerPluginSettings
  const propsContainerPluginSettings = settings.propsContainerPluginSettings

  // ref: https://github1s.com/vuejs/vitepress/blob/main/src/node/markdown/markdown.ts#L221-L222
  const [highlighter] = await createHighlighter({
    dark: 'github-dark',
    light: 'github-light',
  }, {})

  return markdown({
    markdownItOptions: {
      linkify: true,
      highlight: highlighter,
    },
    markdownItSetup (markdownIt) {
      // 用户自定义
      settings.markdownItSetup?.(markdownIt)

      // customBlocks
      customBlocks.forEach((block) => {
        markdownIt.use(
          customContainerPlugin,
          block,
        )
      })

      // details
      markdownIt.use(detailsContainerPlugin)

      // 为标题添加锚点
      markdownIt.use(anchorPlugin)

      // link
      markdownIt.use(linkPlugin, {
        target: '_blank',
        rel: 'noreferrer',
      }, {
        base: settings.base,
        cleanUrls: true,
      })

      // demo
      markdownIt.use(demoContainerPlugin, demoContainerPluginSettings)

      // source
      markdownIt.use(sourceContainerPlugin, sourceContainerPluginSettings)

      // copyableFence
      markdownIt.use(copyableFencePlugin)

      // props container
      markdownIt.use(propsContainerPlugin, propsContainerPluginSettings)
    },

    wrapperClasses: [
      'vp-doc',
      'VPDoc',
      'doc-content',
    ],

  })
}
