import { expect, test } from 'vitest'
import { commonBasepath } from '../commonBasepath'
import path from 'path';


test('commonBasepath', () => {
  const files = [
    path.resolve(__dirname, './multi/a/index.ts'),
    path.resolve(__dirname, './multi/b/index.ts'),
    path.resolve(__dirname, './multi/c/index.ts'),
  ];
  const result = commonBasepath(files);

  expect(result).toBe(path.resolve(__dirname, './multi'));



  expect(
    commonBasepath([
      path.resolve(__dirname, './multi/a/index.ts'),
    ])
  ).toBe(path.resolve(__dirname, './multi/a'))

  expect(
    commonBasepath([])
  ).toBe('')

    expect(
      commonBasepath(['a/b/c', 'e/f/g', 'i/j/k'])
    ).toBe('')

})