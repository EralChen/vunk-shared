import MarkdownIt from 'markdown-it'
import type { ContainerPluginWithParams } from '../types'
import container from 'markdown-it-container'
import path from 'path'
import { existentFilepath } from '@vunk-shared/node/path'
import { getPropsContainerTableData } from './src/getPropsContainerTableData'
import { getSubcontentInContainer, getMaincontentInContainer } from '@vunk-shared/markdown/render'

export interface PropsContainerPluginSettings {
  /**
   * @description
   * 源码根目录
   * */
  root: string
}

export function propsContainerPlugin (
  md: MarkdownIt,
  options?: PropsContainerPluginSettings,
) {
  const root = options?.root || process.cwd()
  const extensions =  ['ts', 'tsx']

  const klass = 'props'

  const emptyStart = '<!-- '


  const args = [
    container,
    klass,
    {
      render (
        tokens, idx,
      ) {
        const token = tokens[idx]

        if (token.nesting === 1) {

          const leadingStr = getSubcontentInContainer(tokens, idx, klass, 'leading')

          const trailingStr = getSubcontentInContainer(tokens, idx, klass, 'trailing')

          const sourceFile = getMaincontentInContainer(tokens, idx, klass)

          
          if (!sourceFile) {
            return emptyStart
          }
          // 判断 sourceFile 有没有后缀名
          const filepath = existentFilepath(
            path.resolve(root, sourceFile),
            extensions,
          )
          if (!filepath) {
            return emptyStart
          }

          // props 描述对象
          const propsTableData = getPropsContainerTableData({
            path: filepath,
          })

          const renderStr = [
            '|prop|type|default|description|',
            '|---|---|---|---|',
            `${leadingStr}`,
            ...propsTableData.map((row) => {
              let prop = row.prop

              row.type = row.type.replaceAll('|', '\\|')

              if (row.link) {
                prop = `[${prop}](${row.link})`
              }
              if (row.required) {
                prop += '*'
              }
              row.isProperty && (prop = `:${prop}`)
              return `|${prop}|${row.type}|${row.default}|${row.description}|`
            }),
            `${trailingStr}`,
          ].filter(Boolean).join('\n')
        
  
          return md.render(renderStr) + emptyStart
        } else {
          return ` -->\n`
        }
      },
    },
  ] as ContainerPluginWithParams

  md.use(...args)


}






