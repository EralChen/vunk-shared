
import { test } from 'vitest'
import { genDtsFiles } from '../genDtsFiles'
import { packagesDir, workRoot } from '@lib-env/path'
import path from 'path'
import { fixPath } from '@lib-env/build-utils'


const testable = false

test('genDtsFiles', async () => {
   
  if (!testable) {
    return
  }

  await genDtsFiles({
    root: workRoot,
    compilerOptions: {
      outDir: path.resolve(workRoot, 'dist/dts_test'),
      baseUrl: workRoot,
    },
    transform: fixPath,
    globSource: [
      '**/*.ts',
      '**/*.vue',
    ],
    globCwd: path.resolve(packagesDir, 'markdown'),

  })

}, {
  timeout: 1000 * 60 * 10,
})