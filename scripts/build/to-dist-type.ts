import { series } from 'gulp'
import { taskWithName } from '@lib-env/shared'
import fsp from 'fs/promises'
import fs from 'fs'
import { distDir, distTypesDir } from '@lib-env/path'
import { fixDtsPaths } from '@lib-env/build-utils'
import path from 'path'
import { readdirAsFlattenedTree } from '@vunk-shared/node/fs'
import { isEqual } from 'lodash'
import { LIB_ENTRY_DIRNAME, LIB_ENTRY_FLIENAME } from '@lib-env/build-constants'


export default series(
  taskWithName('fix dts path in distTypesDir', async () => {
    await fixDtsPaths({
      filesRoot: distTypesDir,
    })
  }),

  taskWithName('to-dist-type', async () => {
    const distDirFiles = await fsp.readdir(
      distDir, 
      { withFileTypes: true },
    )

    // 找到 dist 下打包目录
    const coreDirNames = distDirFiles.filter(item => {
      return item.isDirectory() 
      && 
      path.resolve(distDir, item.name) !== distTypesDir
    }).map(item => item.name)

    // 根据打包目录找到 distTypesDir 中对应的目录
    // 根据打包目录找到 distTypesDir 中对应的目录
    for (const dir of coreDirNames) {
      const coreDir = path.resolve(distDir, dir)
      let typeDir = path.resolve(distTypesDir, dir)
      let isExist = fs.existsSync(typeDir)

      // 有时候类型声明文件在 packages 目录下， 它直接对应 distDir
      const packagesTypeDir = path.resolve(typeDir, 'packages')
      if (
        fs.existsSync(packagesTypeDir)
      ) {
        await fsp.cp(packagesTypeDir, distDir, {
          recursive: true,
        })
      }


      while (
        isExist
        && !isSameDirStructure(coreDir, typeDir)
      ) {
        typeDir = path.resolve(typeDir, dir)
        isExist = fs.existsSync(typeDir)
      }

      if (!isExist) {
        console.warn(`[to-dist-type] 
          coreDir: ${coreDir}
          typeDir: ${typeDir}
          can not find typeDir
        `)
      } else {
        // 拷贝类型声明文件
        await fsp.cp(typeDir, coreDir, {
          recursive: true,
        })
      }


    }

  }),

  taskWithName('cp entry types', async () => {
    const distTypesEntryDirs = [
      path.resolve(distTypesDir, LIB_ENTRY_DIRNAME),
      path.resolve(distDir, LIB_ENTRY_DIRNAME),
    ]
    for (const item of distTypesEntryDirs) {
      if (fs.existsSync(item)) {
        await fsp.cp(item, distDir, {
          recursive: true,
        })
      }
    }
    const distEntryDts = path.resolve(distDir, `${LIB_ENTRY_FLIENAME}.d.ts`)

    if (fs.existsSync(distEntryDts)) {
      await fsp.rename(
        distEntryDts, 
        path.resolve(distDir, `index.d.ts`),
      )
    }
  
  }),

  taskWithName('clear types', async () => {
    await fsp.rm(distTypesDir, {
      force: true,
      recursive: true,
    })
  }),
)



function isSameDirStructure (
  dir1: string,
  dir2: string,
) {
  const dir1FlattenedTree = readdirAsFlattenedTree(dir1, {
    recursive: false,
  })
  const dir2FlattenedTree = readdirAsFlattenedTree(dir2, {
    recursive: false,
  })

  const dir1SubSet = new Set(
    dir1FlattenedTree
      .filter( // 过滤掉入口文件外的其他文件
        item => item.isDirectory 
        || item.filename.includes('index'),
      )
      .map(item => item.filename.split('.').shift()),
  )
  const dir2SubSet = new Set(
    dir2FlattenedTree
      .filter(
        item => item.isDirectory 
        || item.filename.includes('index'),
      )
      .map(item => item.filename.split('.').shift()),
  )

  return isEqual(dir1SubSet, dir2SubSet)
}
