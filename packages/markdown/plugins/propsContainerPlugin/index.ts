import MarkdownIt from 'markdown-it'
import { ContainerPluginWithParams } from '../types'
import container from 'markdown-it-container'
import path from 'path'
import { existentFilepath } from '@vunk-shared/node/path'
import { getPropsContainerTableData } from './src/getPropsContainerTableData'
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



  const args = [
    container,
    klass,
    {
      render (
        tokens, idx,
      ) {
        const token = tokens[idx]

        if (token.nesting === 1) {

          const sourceFileToken = tokens[idx + 2]
          const sourceFile = sourceFileToken.children?.[0].content ?? ''
          if (!sourceFile) {
            return ''
          }
          // 判断 sourceFile 有没有后缀名
          const filepath = existentFilepath(
            path.resolve(root, sourceFile),
            extensions,
          )
          if (!filepath) {
            return ''
          }

          // props 描述对象
          const propsTableData = getPropsContainerTableData({
            path: filepath,
          })

          const renderStr = [
            '|prop|type|default|description|',
            '|---|---|---|---|',
            ...propsTableData.map((row) => {
              let prop = row.prop

              if (row.link) {
                prop = `[${prop}](${row.link})`
              }
              if (row.required) {
                prop += '*'
              }
              row.isProperty && (prop = `:${prop}`)
              return `|${prop}|${row.type}|${row.default}|${row.description}|`
            }),
          ].join('\n')
        
  
          return md.render(renderStr)

        } else {
          return ``
        }
      },
    },
  ] as ContainerPluginWithParams

  md.use(...args)


}






