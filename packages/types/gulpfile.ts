import {series} from 'gulp'
import path from 'path'
import { taskWithName } from '@lib-env/shared'
import { genTypes } from '@lib-env/build-utils'


const buildFile = '**/index.ts'

export default series(
  taskWithName('genSharedTypes', async () => {
    genTypes({
      filesRoot: path.resolve(__dirname),
      source: buildFile,
    })
  }),

)
