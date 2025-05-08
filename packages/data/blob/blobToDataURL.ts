/**
 * @description 将 Blob 对象转换为 base64 编码的 data URL
 * @param blob Blob 对象
 * @returns Promise<string> 返回一个 Promise，解析为 base64 编码的 data URL
 */
export function blobToDataURL (blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
