import { Project, SyntaxKind } from 'ts-morph'
const project = new Project()

export const emptyObjectLiteralExpression  =  project
  .createSourceFile('temp.ts', 'const a = {}')
  .getVariableDeclarationOrThrow('a')
  .getInitializerIfKindOrThrow(
    SyntaxKind.ObjectLiteralExpression
  )
