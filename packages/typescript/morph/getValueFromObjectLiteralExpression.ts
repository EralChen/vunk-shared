import { AsExpression, Expression, ObjectLiteralExpression, PropertyAssignment } from 'ts-morph'


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
  value: string | null,
} {
  const prop = obj.getProperty(field)
  if (!prop) {
    return {
      initializer: null,
      value: null,
    }
  }
  if (prop instanceof PropertyAssignment) {
    const initializer = prop.getInitializer()
    if (initializer instanceof AsExpression) {

      return {
        initializer,
        value: initializer.getExpression().getText() || '',
      }

    }
    return {
      initializer: initializer ?? null,
      value: initializer?.getText() || '',
    }
  }


  return {
    initializer: null,
    value: prop.getText(),
  } 
}

