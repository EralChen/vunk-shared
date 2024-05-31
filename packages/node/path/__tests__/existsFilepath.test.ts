import { test } from 'vitest'
import { existentFilepath } from '../existentFilepath'
import path from 'node:path'
import { packagesDir } from '@lib-env/path'


test('existsFilepath', () => {
  const res = existentFilepath(
    path.resolve(packagesDir, 'browser/isBrowser'),
    ['ts', 'js']
  )

  res
 
})