import { AnyFunc } from '@vunk-shared/types'
import { sleep } from './sleep'

export const waiting = async (
  exec: AnyFunc, 
  interval = 1000,
  tryTimes = 30,
) => {
  let result = await exec()

  while (!result && tryTimes-- > 0) {
    await sleep(interval)
    result = await exec()
  }

  if (result) {
    return result
  } else {
    throw new Error('waiting cannot get result')
  }

}

