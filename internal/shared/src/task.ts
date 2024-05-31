import { workRoot } from '@lib-env/path'
import { gulpTask as taskWithName } from '@vunk-shared/function'
import { run as shellRun } from '@vunk-shared/node/process'

export const run = async (
  script: string, 
  cwd = workRoot,
) => { 
  return shellRun(script, cwd)
}


export {
  taskWithName,
}