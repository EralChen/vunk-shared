import path from 'path'

/**
 * 计算两个文件之间的相对路径
 * @param {string} fromFile - 起始文件路径
 * @param {string} toFile - 目标文件路径
 * @returns  - 生成的相对路径
 */
export function relativeOfFile (
  fromFile: string, 
  toFile: string,
) {
  // 提取目录路径
  const fromDir = path.dirname(fromFile)
  const toDir = path.dirname(toFile)

  // 生成相对路径
  let relativePath = path.relative(fromDir, toDir)


  // 附加文件名
  relativePath = path.join(relativePath, path.basename(toFile))

  // 如果路径不以 '.' 开头，则添加 './'
  if (!relativePath.startsWith('.') && !path.isAbsolute(relativePath)) {
    relativePath = '.' + path.sep + relativePath
  }
  
  return relativePath
}

