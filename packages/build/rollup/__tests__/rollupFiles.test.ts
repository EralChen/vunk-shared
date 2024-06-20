import { test } from 'vitest'
import { rollupFiles } from '../rollupFiles'
import path from 'path'
import { createTsPlugins, createVuePlugins } from '../plugins'

const files = [
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


test('rollupFiles vue',  async () => {
  await rollupFiles({
    input: [
      path.resolve(__dirname, './vue/test1/index.ts'),
      path.resolve(__dirname, './vue/test2/index.ts'),
    ],
    outputDir: path.resolve(__dirname, 'dist/vue'),
    external: ['vue'],
    plugins:[
      ...createTsPlugins(),
      ...createVuePlugins()
    ]
  })
})
