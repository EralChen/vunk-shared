import { test, expect } from "vitest";
import { mergeImport } from '../mergeImport'


const source = [
  'import { a,a1,a2 } from "a";',
  'import { b     , b2 } from "a";',
  'import { c } from "a";',
].join('\n')

test("mergeImport", () => {

  const a = mergeImport(source)
  expect(a).includes(`import { a, a1, a2, b, b2, c } from 'a'`)


});