import { test } from 'vitest'
import path from 'path'
import { createTsPlugins, createVuePlugins, cssOnlyPlugin } from '../index'
import { rollupFiles } from '../../rollupFiles'




test('cssOnlyPlugin', {
  timeout: 1000 * 60 * 10,
}, async () => {

   await rollupFiles({
    input: path.resolve(__dirname, './css/index.ts'),
    outputDir: path.resolve(__dirname, 'dist/css'),
    plugins: [
      ...createTsPlugins(),
      cssOnlyPlugin
    ]
   })
})


