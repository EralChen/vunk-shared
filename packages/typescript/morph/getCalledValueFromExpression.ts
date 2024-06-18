import { ArrowFunction, Block, Expression, FunctionExpression, ParenthesizedExpression, SyntaxKind } from 'ts-morph'
import { getValueFromExpression } from './getValueFromExpression'

/**
 * 
 * @param exp 
 * @returns 
 */
export function getCalledValueFromExpression (
  exp: Expression,
): string {

  if (
    exp instanceof ArrowFunction ||
    exp instanceof FunctionExpression
  ) {
    const body = exp.getBody()

    if (body instanceof ParenthesizedExpression) {
      return getValueFromExpression(body.getExpression())
    }

    if (body instanceof Block) {
      const res = body.getChildrenOfKind(SyntaxKind.ReturnStatement)[0]
      return getValueFromExpression(res.getExpression())
    }

    return body.getText()
  }

  


  return exp.getText()


}