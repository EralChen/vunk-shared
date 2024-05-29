import {series} from 'gulp'
import path from 'path'
import { taskWithName } from '@lib-env/shared'
import { genTypes, rollupFile } from '@lib-env/build-utils'
import { distDir } from '@lib-env/path'


const buildFile = '**/index.ts'

export default series(
  taskWithName('gen index', async () => {
    rollupFile({
      inputFile: path.resolve(__dirname, 'index.ts'),
      outputFile: path.resolve(distDir, 'types/index.mjs'),
      format: 'esm',
    })
  }),
  
  taskWithName('genSharedTypes', async () => {
    genTypes({
      filesRoot: path.resolve(__dirname),
      source: buildFile,
    })
  }),

)
