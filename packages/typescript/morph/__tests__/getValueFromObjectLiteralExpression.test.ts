import { expect, test } from "vitest";
import { getValueFromObjectLiteralExpression } from '../getValueFromObjectLiteralExpression'

import { Project, SyntaxKind } from "ts-morph";

const project = new Project()
const sourceFile = project.createSourceFile('test.ts', `
const obj = {
  type: String as PropType<any>,
  default: '',
}
`)
test("getValueFromObjectLiteralExpression", () => {
  
  const obj = sourceFile
    .getVariableDeclarationOrThrow('obj')
    .getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression)

  const { value } = getValueFromObjectLiteralExpression(obj, 'type')

  expect(value).toBe('String')


});