import { test } from 'vitest'
import path from 'path'
import { createTsPlugins, createCssOnlyPlugin } from '../index'
import { rollupFiles } from '../../rollupFiles'




test('createCssOnlyPlugin', {
  timeout: 1000 * 60 * 10,
}, async () => {

   await rollupFiles({
    input: path.resolve(__dirname, './css/index.ts'),
    outputDir: path.resolve(__dirname, 'dist/css'),
    plugins: [
      ...createTsPlugins(),
      createCssOnlyPlugin({
        fileName: 'styles.css'
      })
    ]
   })
})


