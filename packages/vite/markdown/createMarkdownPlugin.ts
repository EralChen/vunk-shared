import markdown from 'unplugin-vue-markdown/vite'
import { 
  customContainerPlugin, 
  detailsContainerPlugin, 
  linkPlugin,
  anchorPlugin,
  demoContainerPlugin,
  DemoContainerPluginSettings,
  copyableFencePlugin,
  sourceContainerPlugin,
  SourceContainerPluginSettings,
} from '@vunk-shared/markdown/plugins'

import {
  highlight,
} from '@vunk-shared/markdown/shiki'
import type { ReturnVoid } from '@vunk-shared/types'
import type MarkdownIt from 'markdown-it'


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
  markdownItSetup?: (MarkdownIt: MarkdownIt) => ReturnVoid
}

export const createMarkdownPlugin = async (
  settings: CreateMarkdownPluginSettings,
) => {

  const demoContainerPluginSettings = settings.demoContainerPluginSettings
  const sourceContainerPluginSettings = settings.sourceContainerPluginSettings

  return markdown({


    markdownItOptions: {
      linkify: true,
      highlight: (await highlight({
        dark: 'github-dark',
        light: 'github-light',
      }, {})),
    },
  
    markdownItSetup (markdownIt) {
  
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
      markdownIt.use(linkPlugin,
        { 
          target: '_blank', 
          rel: 'noreferrer', 
        },
        {
          base: settings.base,
          cleanUrls: true,
        },
      )
  
      // demo
      markdownIt.use(demoContainerPlugin, demoContainerPluginSettings)
  

      // source
      markdownIt.use(sourceContainerPlugin, sourceContainerPluginSettings)

      // copyableFence
      markdownIt.use(copyableFencePlugin)
  
      // 用户自定义
      settings.markdownItSetup?.(markdownIt)
  
    },
  
    wrapperClasses: [
      'vp-doc',
      'VPDoc',
      'doc-content',
    ],
  
  })
} 