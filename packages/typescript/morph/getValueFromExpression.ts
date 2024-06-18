import { AsExpression, Expression } from 'ts-morph'

/**
 * 从表达式中获取值
 * @param exp 
 * @returns 
 */
export function getValueFromExpression (
  exp?: Expression,
): string {
  if (!exp) {
    return ''
  }
  if (exp instanceof AsExpression) {
    return exp.getExpression().getText()
  }
  return exp.getText()
}
