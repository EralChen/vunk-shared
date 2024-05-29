
import type container from 'markdown-it-container'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'


export type ContainerPluginWithParams = [
  typeof container, 
  string, 
  { 
    render: RenderRule 
  }
]
