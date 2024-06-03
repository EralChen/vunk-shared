import { series, dest,src } from 'gulp'
import { taskWithName } from '@lib-env/shared'
import path from 'path'
import { workRoot, docRoot } from '@lib-env/path'

const inputAssets = path.resolve(workRoot, './node_modules/@arcgis/core/assets')
const outputAssets = path.resolve(docRoot, './public/Esri')

export default series(
  taskWithName('copy assets', async () => {
    //
    return src(inputAssets + '/**/*').pipe(
      dest(outputAssets),
    )
    
  }),
)