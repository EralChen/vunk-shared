import { expect, test } from "vitest";
import { getValueFromObjectLiteralExpression } from '../getValueFromObjectLiteralExpression'
import { getTypeFromAsExpression } from '../getTypeFromAsExpression'

import { AsExpression, Project, SyntaxKind } from "ts-morph";

const project = new Project()
const sourceFile = project.createSourceFile('test.ts', `
const obj = {
  type: String as PropType<any>,
  default: '',
}
`)
test("getTypeFromAsExpression.test", () => {
  
  const obj = sourceFile
    .getVariableDeclarationOrThrow('obj')
    .getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression)

  const { value, initializer } = getValueFromObjectLiteralExpression(obj, 'type')

  expect(value).toBe('String')
  if (initializer instanceof AsExpression) {
    const type = getTypeFromAsExpression(initializer).value
    expect(type).toBe('PropType<any>')

    const typeInner = getTypeFromAsExpression(initializer, {
      typeReferenceTransform(tr) {
        return tr.getTypeName()
          .getText() === 'PropType' 
            ? tr.getTypeArguments()[0] 
            : tr
      },
    }).value
    
    expect(typeInner).toBe('any')
  }


});
