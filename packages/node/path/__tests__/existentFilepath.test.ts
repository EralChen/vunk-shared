import { test } from 'vitest'
import { existentFilepath } from '../existentFilepath'
import path from 'path'
import { packagesDir } from '@lib-env/path'


test('existentFilepath', () => {
  const res = existentFilepath(
    path.resolve(packagesDir, 'browser/isBrowser'),
    ['ts', 'js']
  )

  res
 
})