import { Expression, MethodDeclaration, ObjectLiteralExpression, PropertyAssignment, SyntaxKind } from 'ts-morph'
import { getValueFromExpression } from './getValueFromExpression'


/**
 * 从 ObjectLiteralExpression 中获取指定属性的值
 * @param obj ObjectLiteralExpression
 * @param field 属性名
 * @returns 
 *  - initializer: 属性的初始化表达式
 *  - value: 属性的值
 */
export function getValueFromObjectLiteralExpression (
  obj: ObjectLiteralExpression,
  field: string,
): {
  initializer: Expression | null,
  value: string,
} {
  const prop = obj.getProperty(field)
  if (!prop) {
    return {
      initializer: null,
      value: '',
    }
  }
  
  if (prop instanceof PropertyAssignment) {
    const initializer = prop.getInitializer()

    return {
      initializer: initializer ?? null,
      value: getValueFromExpression(initializer),
    }
  }
  
  if (prop instanceof MethodDeclaration) {

    /* 将  MethodDeclaration 转为 FunctionExpress */
    const project = obj.getSourceFile().getProject()
    let source = project.getSourceFile('__vunk_getValueFromObjectLiteralExpression.ts')

    if (!source) {
      source = project.createSourceFile(
        '__vunk_getValueFromObjectLiteralExpression.ts',
        'const data = {}',
      )
    }

    const nObj = source
      .getVariableDeclarationOrThrow('data')
      .getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression)

    const functionProp = nObj.addPropertyAssignment({
      name: prop.getName(),
      initializer: prop.getFullText()
        .replace(prop.getName(), 'function'),
    })

    const data = {
      initializer: functionProp.getInitializer() ?? null,
      value: getValueFromExpression(functionProp.getInitializer()),
    }

    return data
  
  }
  
  return {
    initializer: null,
    value: prop.getText(),
  } 
}

