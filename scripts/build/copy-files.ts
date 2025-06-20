import path from 'path'
import { workRoot } from '@lib-env/path'
import { taskWithName } from '@lib-env/shared'
import { dest, parallel, src } from 'gulp'

const outputAssets = path.resolve(workRoot, './dist')

export default parallel(
  taskWithName('copy readme', async () => {
    const inputAssets = path.resolve(workRoot, './README.md')

    return src(inputAssets).pipe(
      dest(outputAssets),
    )
  }),

  taskWithName('copy LICENSE', async () => {
    const inputAssets = path.resolve(workRoot, './LICENSE')

    return src(inputAssets).pipe(
      dest(outputAssets),
    )
  }),
)
