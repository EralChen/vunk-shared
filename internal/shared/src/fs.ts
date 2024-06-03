import { existsSync, readFileSync } from 'node:fs'
import { mkdir, writeFile } from 'fs/promises'

export const writeJson = (path: string, data: any, spaces = 2) =>
  writeFile(path, JSON.stringify(data, undefined, spaces), 'utf-8')
  
export const readJson = (path: string) => JSON.parse(
  readFileSync(path, { encoding: 'utf-8' }).toString(),
) 


export const ensureDir = async (path: string) => {
  if (!existsSync(path)) await mkdir(path, { recursive: true })
}
