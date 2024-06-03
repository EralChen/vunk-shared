import fsp from 'fs/promises'
import fs from 'fs'
import { distDir, distTypesDir } from '@lib-env/path'
import path from 'path'
import { readdirAsFlattenedTree } from '@vunk-shared/node/fs'
import { isEqual } from 'lodash-es'

import { test }  from 'vitest'


function isSameDirStructure(
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
    dir1FlattenedTree.map(item => item.filename.split('.').shift())
  )
  const dir2SubSet = new Set(
    dir2FlattenedTree.map(item => item.filename.split('.').shift())
  )

  return isEqual(dir1SubSet, dir2SubSet)
}

test('to-dist-type', async () => {
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
  for (const dir of coreDirNames) {
    const coreDir = path.resolve(distDir, dir)
    let typeDir = path.resolve(distTypesDir, dir)
    let isExist = fs.existsSync(typeDir)
    while (
      isExist
      && !isSameDirStructure(coreDir, typeDir)
    ) {
      typeDir = path.resolve(typeDir, dir)
      isExist = fs.existsSync(typeDir)
    }

    if (!isExist) {
      // throw new Error(`找不到 ${dir} 对应的类型声明目录`)
      continue
    }

    // 拷贝类型声明文件
    // await fsp.cp(typeDir, coreDir, {
    //   recursive: true,
    // })
  
  }

})

