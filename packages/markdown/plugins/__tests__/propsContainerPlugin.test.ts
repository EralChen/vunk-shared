import { test } from 'vitest'
import path from 'path'
import { 
  Project, 
  ObjectLiteralExpression, PropertyAssignment, AsExpression, SyntaxKind, 
  TypeReferenceNode
  
 } from 'ts-morph'
 import { 
  getValueFromObjectLiteralExpression,
  getTypeFromAsExpression,
  parseCommentFromRanges,
  emptyObjectLiteralExpression
} from '@vunk-shared/typescript/morph'
import { getCalledValueFromExpression } from '@vunk-shared/typescript/morph/getCalledValueFromExpression'
import { NormalObject } from '@vunk-shared/types'
import { PropsContainerTableRow } from '../propsContainerPlugin/src/getPropsContainerTableData'





test('propsContainerPlugin.test', () => {
  const project = new Project()
  const sourceFile = project.addSourceFileAtPath(
    path.resolve(__dirname, './propsContainerPlugin.ctx.ts'),
  )

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
  

  console.log(infoList)



})
