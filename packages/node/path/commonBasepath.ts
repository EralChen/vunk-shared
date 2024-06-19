import path from 'path'


export function commonBasepath (paths: string[]): string {

  if (paths.length === 0) return ''
  if (paths.length === 1) return path.dirname(paths[0])

  const [firstPath, ...otherPaths] = paths.map(p => path.join(p))
  const firstPathParts = firstPath.split(path.sep)

  let commonParts = firstPathParts

  for (const filePath of otherPaths) {
    const filePathParts = filePath.split(path.sep)
    let i = 0
    while (i < commonParts.length && i < filePathParts.length && commonParts[i] === filePathParts[i]) {
      i++
    }
    commonParts = commonParts.slice(0, i)
  }

  return commonParts.length > 0 ? commonParts.join(path.sep) : ''
}