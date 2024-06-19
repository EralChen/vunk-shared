import { test } from 'vitest'
import { rollupFiles } from '../rollupFiles'
import path from 'path'
import { replaceRight } from '@vunk-shared/string'


const files = [
  path.resolve(__dirname, './multi/a/index.ts'),
  path.resolve(__dirname, './multi/b/index.ts'),
  path.resolve(__dirname, './multi/c/index.ts'),
]

const relative = path.resolve(__dirname, './multi')


test('rollupFiles', {
  timeout: 1000 * 60 * 10,
}, async () => {

   await rollupFiles({
    input: files,
    outputDir: path.resolve(__dirname, 'dist/multi'),
    outputOptions: {
      
      entryFileNames (info) {
        if (
          info.facadeModuleId
        ) {
          const relativePath = path.relative(relative, info.facadeModuleId)
          const ext = path.extname(relativePath)
          const name = replaceRight(relativePath, ext, '.js')
          return name
        }

        return info.name + '.js'
      },
      

    }
   })
})