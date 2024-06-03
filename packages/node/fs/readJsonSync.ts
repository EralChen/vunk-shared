import { readFileSync } from 'node:fs'


export const readJsonSync = (path: string) => JSON.parse(
  readFileSync(path, { encoding: 'utf-8' }).toString(),
) 

