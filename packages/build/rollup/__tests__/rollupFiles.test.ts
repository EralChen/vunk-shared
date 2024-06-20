import { test } from 'vitest'
import { rollupFiles } from '../rollupFiles'
import path from 'path'

const files = [
  path.resolve(__dirname, './multi/index.ts'),
  path.resolve(__dirname, './multi/a/index.ts'),
  path.resolve(__dirname, './multi/b/index.ts'),
  path.resolve(__dirname, './multi/c/index.ts'),
]



test('rollupFiles', {
  timeout: 1000 * 60 * 10,
}, async () => {

   await rollupFiles({
    input: files,
    outputDir: path.resolve(__dirname, 'dist/multi'),
   })
})