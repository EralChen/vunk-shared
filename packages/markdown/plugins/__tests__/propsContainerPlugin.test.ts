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



interface PropsTableColumn {
  prop: string

  type: string
  default: string
  required: boolean

  isProperty: boolean

  description: string
  link: string
}




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
      let obje =  prop.getInitializerIfKind(
        SyntaxKind.ObjectLiteralExpression
      ) ?? emptyObjectLiteralExpression

      if (!obje) { // key: null 的情况 obje 初始化为 {}
        obje = project
          .createSourceFile('temp.ts', 'const a = {}')
          .getVariableDeclarationOrThrow('a')
          .getInitializerIfKindOrThrow(
            SyntaxKind.ObjectLiteralExpression
          )
      }
     

      const requiredInfo = getValueFromObjectLiteralExpression(obje, 'required')
      const required = requiredInfo.initializer?.getKindName() === 'TrueKeyword'


      const typeInfo = getValueFromObjectLiteralExpression(obje, 'type')
      let type = typeInfo.value
      if (typeInfo.initializer instanceof AsExpression) {
        type = getTypeFromAsExpression(
          typeInfo.initializer, 
          {
            typeReferenceTransform(tr) {
              return tr.getTypeName()
                .getText() === 'PropType' 
                  ? tr.getTypeArguments()[0] 
                  : tr
            },
          }
        ).value
      }

      const defaultInfo = getValueFromObjectLiteralExpression(obje, 'default')
      let defaultValue = defaultInfo.value
      if (defaultInfo.initializer) {
        defaultValue = getCalledValueFromExpression(defaultInfo.initializer)
      }

      const commentInfo = parseCommentFromRanges(
        prop.getLeadingCommentRanges()
      ).reduce((a, item) => {
        for (const key in item) {
          a[key] = item[key]
        }
        return a
      }, {} as NormalObject)

      a.push({
        prop: name,
        type,
        default: defaultValue,
        description: commentInfo.description ?? '',
        link: commentInfo.link ?? '',
        required,
        isProperty: 'property' in commentInfo,
      })
    }
    return a
  }, [] as PropsTableColumn[])

  console.log(infoList)



})
