import { expect, test } from "vitest";
import { getValueFromObjectLiteralExpression } from '../getValueFromObjectLiteralExpression'
import { getCalledValueFromExpression } from '../getCalledValueFromExpression'
import { Project, SyntaxKind } from "ts-morph";

const project = new Project()
const sourceFile = project.createSourceFile('test.ts', `
const obj = {
  default: () => ({}),
  default2: () => ({} as { a: string }),
  default3: () => ({} as { a: string }).a,
  default4: () => {
    return {}
  },
  default5: () => {
    return {} as { a: string }
  },

  default6 () {
    return {}
  }
}
`)
test("getCalledValueFromExpression.test", () => {
  
  const obj = sourceFile
    .getVariableDeclarationOrThrow('obj')
    .getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression)

  {
    const { initializer } = getValueFromObjectLiteralExpression(obj, 'default5')

    if (initializer) {
      const calledValue = getCalledValueFromExpression(initializer)

      expect(calledValue).toBe('{}')
    }
  }


  {
    const { initializer } = getValueFromObjectLiteralExpression(obj, 'default4')

    if (initializer) {
      const calledValue = getCalledValueFromExpression(initializer)

      expect(calledValue).toBe('{}')
    }
  }

  {
    const { initializer } = getValueFromObjectLiteralExpression(obj, 'default3')

    if (initializer) {
      const calledValue = getCalledValueFromExpression(initializer)

      expect(calledValue).toBe('({} as { a: string }).a')
    }
  }

  {
    const { initializer } = getValueFromObjectLiteralExpression(obj, 'default6')

    if (initializer) {
      const calledValue = getCalledValueFromExpression(initializer)

    
    }
  }






});
