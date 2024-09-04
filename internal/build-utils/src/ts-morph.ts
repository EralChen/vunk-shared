import path from 'path'
import { distTypesDir, workRoot } from '@lib-env/path'
import { fixPath } from './alias'
import { genDtsFiles } from '@vunk-shared/build/morph'
import { CompilerOptions } from 'ts-morph'

export async function genTypes (opts = {} as {
  filesRoot: string
  source?: string
  outDir?: string
  compilerOptions?: CompilerOptions
}) { // 生成一个 .d.ts

  const outDir = path.resolve(distTypesDir, opts.outDir ?? '')
  const globSource = opts.source ?? '**/*'
  const globCwd = opts.filesRoot
  const compilerOptions = opts.compilerOptions

  await genDtsFiles({
    root: workRoot,
    compilerOptions: {
      outDir,
      ...compilerOptions,
    },
    globSource,
    globCwd,
    transform: fixPath,
  })

}