import { parallel, series } from 'gulp'
import mri from 'mri'
import { taskWithName } from '@lib-env/shared'
import fsp from 'fs/promises'
import path from 'path'
import { pkgsComponentsDir } from '@lib-env/path'
import { camelize, capitalize } from 'vue'
import { createCtxStr, createIndexStr, createTypesStr, createVueStr } from './temp'
interface MriData {
  name: string // aaa-bbb
}

const argv = process.argv.slice(2)
const mriData = mri<MriData>(argv)
const componentPath = path.resolve(pkgsComponentsDir, mriData.name)
const srcPath = path.resolve(componentPath, './src')

// aaa-bbb => AaaBbb
const capName = capitalize(camelize(mriData.name))

export default series(
  async () => fsp.mkdir(srcPath, {
    recursive: true,
  }),
  parallel(
    taskWithName('createIndex', async () => {
      return fsp.appendFile(
        path.resolve(componentPath, './index.ts'),
        createIndexStr(capName),
      )
    }),
    taskWithName('createTypesFile', async () => {
      return fsp.appendFile(
        path.resolve(srcPath, './types.ts'),
        createTypesStr(),
      )
    }),
    taskWithName('createVueFile', async () => {
      return fsp.appendFile(
        path.resolve(srcPath, './index.vue'),
        createVueStr(capName),
      )
    }),
    taskWithName('createCtxFile', async () => {
      return fsp.appendFile(
        path.resolve(srcPath, './ctx.ts'),
        createCtxStr(),
      )
    }),


  ),
)

