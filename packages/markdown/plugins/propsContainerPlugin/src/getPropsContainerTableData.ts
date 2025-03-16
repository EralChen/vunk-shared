import { NormalObject } from '@vunk-shared/types'
import { getCalledValueFromExpression, getTypeFromAsExpression, getValueFromObjectLiteralExpression, parseCommentFromRanges, emptyObjectLiteralExpression } from '@vunk-shared/typescript/morph'

import { AsExpression, Project, PropertyAssignment, SourceFile, SyntaxKind } from 'ts-morph'


export interface PropsContainerTableRow {
  /**
   * 属性名
   */
  prop: string
  /**
   * 类型
   */
  type: string
  /**
   * 默认值
   */
  default: string

  /**
   * 是否必须
   */
  required: boolean

  /**
   * 是否是双向绑定属性
   */
  isMember: boolean

  /**
   * 描述
   */
  description: string

  /**
   * 链接
   */
  link: string
}



export function getPropsContainerTableData (options: {
  path?: string
  source?: string 
}): PropsContainerTableRow[] {
  const project = new Project()
  const filepath = options.path
  const source = options.source


  if (!filepath && !source) {
    throw new Error('path 和 source 不能同时为空')
  }

  
  let sourceFile: SourceFile | null = null
  if (filepath) {
    sourceFile = project.addSourceFileAtPath(filepath)
  }

  if (source) {
    sourceFile = project.createSourceFile('source.ts', source)
  }

  if (!sourceFile) {
    throw new Error('sourceFile 创建失败')
  }

  const props = sourceFile
    .getVariableDeclarationOrThrow('props')
    .getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression)


  const infoList = props.getProperties().reduce((a, prop) => {
    if (prop instanceof PropertyAssignment) {
      const name = prop.getName()
      const obje =  prop.getInitializerIfKind(
        SyntaxKind.ObjectLiteralExpression,
      )  ?? emptyObjectLiteralExpression


      const requiredInfo = getValueFromObjectLiteralExpression(obje, 'required')
      const required = requiredInfo.value === 'true'



      const typeInfo = getValueFromObjectLiteralExpression(obje, 'type')
      let type = typeInfo.value
      if (typeInfo.initializer instanceof AsExpression) {
        type = getTypeFromAsExpression(
          typeInfo.initializer, 
          {
            typeReferenceTransform (tr) {
              return tr.getTypeName()
                .getText() === 'PropType' 
                ? tr.getTypeArguments()[0] 
                : tr
            },
          },
        ).value
      }

      const defaultInfo = getValueFromObjectLiteralExpression(obje, 'default')
      let defaultValue = defaultInfo.value
      if (defaultInfo.initializer) {
        defaultValue = getCalledValueFromExpression(defaultInfo.initializer)
      }

      const commentInfo = parseCommentFromRanges(
        prop.getLeadingCommentRanges(),
      ).reduce((a, item) => {
        for (const key in item) {
          a[key] = item[key]
        }
        return a
      }, {} as NormalObject)

      a.push({
        prop: name,
        type,
        default: commentInfo.default || defaultValue,
        description: commentInfo.description || '',
        link: commentInfo.link ?? '',
        required,
        isMember: 'member' in commentInfo,
      
      
      })
    }
    return a
  }, [] as PropsContainerTableRow[])

  

  return infoList


}


