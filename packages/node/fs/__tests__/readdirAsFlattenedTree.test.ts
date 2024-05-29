import { test } from 'vitest'
import { readdirAsFlattenedTree } from '../readdirAsFlattenedTree'
import { packagesDir } from '@lib-env/path'

test('readdirAsFlattenedTree', () => {
  const list = readdirAsFlattenedTree(packagesDir, {
    ignore: [
      '**/node_modules**',
      '**/__tests__**',
      '**/index.ts',
      '**/package.json',
      '**/gulpfile.ts',
      'entry'
    ],
  })
  // console.log(list)
})
