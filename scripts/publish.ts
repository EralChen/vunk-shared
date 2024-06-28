import {series} from 'gulp'
import fsp from 'fs/promises'
import path from 'path'
import { entryPackage, distDir } from '@lib-env/path'
import { run, taskWithName } from '@lib-env/shared'
import { readJsonSync, writeJsonSync, readdirAsFlattenedTree } from '@vunk-shared/node/fs'
import { replaceRight } from '@vunk-shared/string'
import { existsSync } from 'fs'

export default series(


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
        import?: string,
        types?: string,
        require?: string,
      }>
    }
    jsonObj.module = 'index.esm.js'
    jsonObj.main = 'index.esm.js'
    jsonObj.exports = {
      '.': {
        import: './index.esm.js',
        types: './index.d.ts',
      },
    }

    const distTree = readdirAsFlattenedTree(distDir)
    const modelEntries = distTree
      .filter(item => item.filename === 'index.mjs')


    modelEntries.forEach(item => {

      const cjsPath = replaceRight(item.id, '.mjs', '.cjs')

      let relativePath = path.relative(distDir, item.pid).replace(/\\/g, '/')

      relativePath = './' + relativePath
      

      jsonObj.exports[relativePath] = {
        import: `${relativePath}` + `/${item.filename}`,
        types: `${relativePath}` + `/${item.filename.replace('.mjs', '.d.ts')}`,
      }

      if (existsSync(cjsPath)) {
        jsonObj.exports[relativePath].require = `${relativePath}` + `/${item.filename.replace('.mjs', '.cjs')}`
      }

    })

    const cssEntries = distTree
      .filter(item => item.filename === 'index.css')
    
    cssEntries.forEach(item => {
      let relativePath = path.relative(distDir, item.pid).replace(/\\/g, '/')

      relativePath = './' + relativePath

      const relativeFile = `${relativePath}` + `/${item.filename}`

      jsonObj.exports[relativeFile] = {
        import: relativeFile,
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
