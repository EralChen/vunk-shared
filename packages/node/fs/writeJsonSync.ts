import { writeFileSync } from 'fs'

export const writeJsonSync = (
  path: string, 
  data: any, 
  spaces = 2,
) => {
  return writeFileSync(
    path, 
    JSON.stringify(data, undefined, spaces),
    'utf-8',
  )
}
  
  