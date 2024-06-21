import { parallel, dest, src } from 'gulp'
import { taskWithName } from '@lib-env/shared'
import path from 'path'
import { workRoot } from '@lib-env/path'

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