import { AsExpression, TypeNode, TypeReferenceNode } from 'ts-morph'

/**
 * 从 AsExpression 中获取类型
 * @param exp 
 * @param options
 * @param options.typeReferenceTransform 如果是 TypeReferenceNode 类型，可以通过这个函数转换
 * @returns
 *  - typeNode 
 *  - value 
 */

export function getTypeFromAsExpression (
  exp: AsExpression,
  options: {
    typeReferenceTransform?: (tr: TypeReferenceNode) => TypeNode,
  } = {},
): {
  typeNode: TypeNode | null
  value: string
} {
  const typeNode = exp.getTypeNode()
  const { typeReferenceTransform } = options

  if (!typeNode) {
    return {
      typeNode: null,
      value: '',
    }
  }

  if (
    typeNode instanceof TypeReferenceNode 
    && typeReferenceTransform
  ) {
    const ntr = typeReferenceTransform(typeNode)
    return {
      typeNode: ntr,
      value: ntr.getText(),
    }
  }

  return {
    typeNode,
    value: typeNode.getText(),
  }
  
}