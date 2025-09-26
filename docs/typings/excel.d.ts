// excel.d.ts
declare module '*.xlsx' {
  // 默认导出：Excel Sheet 的 JSON 数组
  const value: any
  export default value

  // 可选导出：所有 sheet 名称
  export const sheets: string[]
}

declare module '*.xls' {
  const value: any
  export default value
  export const sheets: string[]
}

declare module '*.csv' {
  const value: any
  export default value
  export const sheets: string[]
}
