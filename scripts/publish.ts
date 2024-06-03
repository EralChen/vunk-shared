import {series} from 'gulp'
import fsp from 'fs/promises'
import path from 'path'
import { entryPackage, distDir } from '@lib-env/path'
import { run, taskWithName } from '@lib-env/shared'
import { readJsonSync, writeJsonSync, readdirAsFlattenedTree } from '@vunk-shared/node/fs'

export default series(
  taskWithName('update:vision', async () => {

    const fileObj = readJsonSync(entryPackage) as { version: string; module: string }
    // 默认小版本+1
    const versionList = fileObj.version.split('.')
    const sVersion = versionList.at(-1)
    if (sVersion) {
      versionList[versionList.length - 1] = +sVersion + 1 + ''
    }
    fileObj.version = versionList.join('.')
    writeJsonSync(entryPackage, fileObj, 2)
  }),

  taskWithName('destPkg', async () => {
    const distPkgFile = path.resolve(distDir, './package.json')

    await fsp.cp(
      entryPackage,
      distPkgFile,
    )
    // 处理 pkg
    const jsonObj = readJsonSync(distPkgFile) as { 
      module: string, 
      main: string,
      exports: Record<string, {
        import: string,
        require?: string,
      }>
    }
    jsonObj.module = 'index.esm.js'
    jsonObj.main = 'index.esm.js'
    jsonObj.exports = {
      '.': {
        import: './index.esm.js',
      },
    }

    const modelEntries = readdirAsFlattenedTree(distDir)
      .filter(item => item.filename === 'index.mjs')


      
    modelEntries.forEach(item => {
      let relativePath = path.relative(distDir, item.pid).replace(/\\/g, '/')

      relativePath = './' + relativePath

      jsonObj.exports[relativePath] = {
        import: `${relativePath}` + `/${item.filename}`,
      }

    })
    writeJsonSync(distPkgFile, jsonObj, 2)
  }),
  
  taskWithName('publish', async () => {
    run(
      'npm publish --registry https://registry.npmjs.org --access public',
      distDir,
    )
  }),
)
