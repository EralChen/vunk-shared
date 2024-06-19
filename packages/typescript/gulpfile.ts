import {series} from 'gulp'
import path from 'path'
import glob from 'fast-glob'
import { distDir } from '@lib-env/path'
import { taskWithName } from '@lib-env/shared'
import { filePathIgnore } from '@lib-env/build-constants'
import { genTypes, rollupFile } from '@lib-env/build-utils'


const buildFile = '**/index.ts'
const baseDirname = 'typescript'

const getOutputFile = (filePath: string) => path.resolve(
  distDir, 
  `${baseDirname}/${
    path
      .relative(path.resolve(__dirname), filePath)
      .replace('.ts', '.mjs')
  }`,
)


export default series(

  taskWithName(`bundle ${baseDirname}`, async () => {

    const filePaths = await glob(buildFile, {
      cwd: path.resolve(__dirname, './'),
      onlyFiles: true,
      absolute: true,
      ignore: filePathIgnore,
    })

    filePaths.forEach(item => {
      rollupFile({
        inputFile: item,
        outputFile: getOutputFile(item),
        format: 'esm',
        // 'comment-parser'
        external: ['ts-morph'],
      })
    })

  }),

  taskWithName(`gen ${baseDirname} types`, async () => {
    genTypes({
      filesRoot: path.resolve(__dirname),
      source: buildFile,
      outDir: baseDirname,
    })
  }),

)
