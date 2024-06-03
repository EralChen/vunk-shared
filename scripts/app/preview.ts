import { appRootDirs } from '@lib-env/path'
import { taskWithName, run } from '@lib-env/shared'
import { series } from 'gulp'
import path from 'path'

export default series([
  taskWithName('build', async () => {
    await run('npm run build', appRootDirs[0])
  }),
  taskWithName('http-server', async () => {
    await run('npx http-server ./', path.resolve(appRootDirs[0], 'dist'))
  }),
])