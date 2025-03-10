import path from 'node:path'
import { fixPath } from '@lib-env/build-utils'
import { packagesDir, workRoot } from '@lib-env/path'
import { it } from 'vitest'
import { genDtsFiles } from '../genDtsFiles'

const testable = false

it('genDtsFiles', {
  timeout: 1000 * 60 * 10,
}, async () => {
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
})
