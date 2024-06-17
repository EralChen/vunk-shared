import { test } from 'vitest'
import path from 'path'
import { 
  Project, 
  ObjectLiteralExpression, PropertyAssignment, AsExpression, SyntaxKind, 
  TypeReferenceNode
 } from 'ts-morph'
 import { 
  getValueFromObjectLiteralExpression,
  getTypeFromAsExpression
} from '@vunk-shared/typescript/morph'



interface PropsTableColumn {
  prop: string
  type: string
  default: string
  description: string
  link: string
  required: boolean
}

function getValueFromProperty (
  obj: ObjectLiteralExpression,
  field: string
) {
  const prop = obj.getProperty(field)
  if (!prop) {
    return ''
  }
  if (prop instanceof PropertyAssignment) {
    return prop.getInitializer()?.getText() || ''
  }
  return prop.getText()
}



function getType (
  prop: PropertyAssignment,
  slicedTypeName = ['PropType']
) {
  const children = prop.getChildren()
  const type = children.find((child) => child instanceof AsExpression)
  
  if (!type) {
    return prop.getInitializer()?.getText() || ''
  }

  const typeReference = type.getTypeNodeOrThrow()

  if (typeReference instanceof TypeReferenceNode) {
    return getTypeFromTypeReference(
      typeReference, 
      slicedTypeName
    )
  }

  return type.getText()
}

function getTypeFromTypeReference (
  tnode: TypeReferenceNode,
  slicedTypeName: string[] = []
) {

  const typename = tnode.getTypeName().getText()

  if (slicedTypeName.includes(typename)) {
    return tnode
      .getChildrenOfKind(SyntaxKind.TypeReference)
      .map((child) => {
        return getTypeFromTypeReference(child, slicedTypeName)
      }).join(',')
  }


  return tnode.getText()

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

      const obje =  prop.getInitializerIfKindOrThrow(
        SyntaxKind.ObjectLiteralExpression
      )

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



 
      a.push({
        prop: name,
        type,
        default: '',
        description: '',
        link: '',
        required,
      })
    }


    return a


  }, [] as PropsTableColumn[])

  infoList


})
