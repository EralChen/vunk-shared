import type { PluginOption } from 'vite'
import * as XLSX from 'xlsx'

export interface ExcelPluginOptions {
  // 是否保留空单元格：空值将使用 null 填充（否则跳过该键）
  keepEmptyCells?: boolean
  // 是否保留空行：整行为空时是否也保留
  keepBlankRows?: boolean
  // 表头处理：
  // - undefined: 使用 XLSX 默认（第一行为表头）
  // - 'auto': 自动检测表头行
  // - number: 指定 1-based 行号作为表头行
  // - string[]: 直接指定表头
  header?: 'auto' | number | Array<string>
  // 是否保留原始类型（传给 XLSX 的 raw），默认 true
  raw?: boolean
}

type RowArray = any[]
type RowsArray = RowArray[]

function isExcelLike (id: string) {
  const path = id.split('?')[0].toLowerCase()
  return /\.(?:xlsx|xls|csv)$/.test(path)
}

function hasReservedViteQuery (query: URLSearchParams) {
  // 与 Vite 内置资源查询保持兼容，出现这些查询时让位给其他插件处理
  const reserved = ['url', 'raw', 'worker', 'inline']
  return reserved.some(k => query.has(k))
}

function parseId (id: string) {
  const qIndex = id.indexOf('?')
  if (qIndex === -1)
    return { file: id, query: new URLSearchParams() }
  const file = id.slice(0, qIndex)
  const qs = id.slice(qIndex + 1)
  return { file, query: new URLSearchParams(qs) }
}

function countNonEmpty (arr: RowArray) {
  let n = 0
  for (const v of arr) {
    if (v !== undefined && v !== null && v !== '')
      n++
  }
  return n
}

function isBlankRow (arr: RowArray) {
  return countNonEmpty(arr) === 0
}

function dedupeHeaderKeys (keys: any[]) {
  const map = new Map<string, number>()
  return keys.map((k, i) => {
    const key = k == null || k === '' ? `COL_${i + 1}` : String(k)
    if (!map.has(key)) {
      map.set(key, 1)
      return key
    }
    const count = (map.get(key) || 1) + 1
    map.set(key, count)
    return `${key}_${count}`
  })
}

function rowsToObjects (
  rows: RowsArray,
  headerKeys: string[],
  startRow: number,
  keepBlankRows: boolean | undefined,
  keepEmptyCells: boolean | undefined,
) {
  const out: any[] = []
  for (let r = startRow; r < rows.length; r++) {
    const row = rows[r] || []
    if (!keepBlankRows && isBlankRow(row))
      continue
    const obj: Record<string, any> = {}
    for (let c = 0; c < headerKeys.length; c++) {
      const key = headerKeys[c]
      const val = row[c]
      if (val === undefined) {
        if (keepEmptyCells)
          obj[key] = null
        // else: 跳过该键
      }
      else {
        obj[key] = val
      }
    }
    out.push(obj)
  }
  return out
}

function sheetToJSONWithHeaderStrategy (
  ws: XLSX.WorkSheet,
  options: ExcelPluginOptions,
) {
  const raw = options.raw !== false
  // 先拿二维数组
  const rows: RowsArray = XLSX.utils.sheet_to_json(ws, { header: 1, raw }) as any

  if (Array.isArray(options.header)) {
    const headerKeys = dedupeHeaderKeys(options.header)
    return rowsToObjects(rows, headerKeys, 0, options.keepBlankRows, options.keepEmptyCells)
  }

  if (typeof options.header === 'number') {
    const idx = Math.max(0, Math.floor(options.header) - 1)
    const headerRow = rows[idx] || []
    const headerKeys = dedupeHeaderKeys(headerRow)
    return rowsToObjects(rows, headerKeys, idx + 1, options.keepBlankRows, options.keepEmptyCells)
  }

  if (options.header === 'auto') {
    // 在前若干行中选择非空单元格最多的一行作为表头
    const limit = Math.min(20, rows.length)
    let bestIdx = 0
    let bestScore = -1
    for (let i = 0; i < limit; i++) {
      const score = countNonEmpty(rows[i] || [])
      if (score > bestScore) {
        bestScore = score
        bestIdx = i
      }
    }
    const headerRow = rows[bestIdx] || []
    const headerKeys = dedupeHeaderKeys(headerRow)
    return rowsToObjects(rows, headerKeys, bestIdx + 1, options.keepBlankRows, options.keepEmptyCells)
  }

  // 默认：交给 XLSX 的对象模式（使用第一行作为表头）
  return XLSX.utils.sheet_to_json(ws, {
    raw,
    defval: options.keepEmptyCells ? null : undefined,
    blankrows: !!options.keepBlankRows,
  })
}

function sheetToRows (ws: XLSX.WorkSheet, options: ExcelPluginOptions) {
  // 根据 header 策略选择转换方式
  const needsCustom
    = Array.isArray(options.header) || typeof options.header === 'number' || options.header === 'auto'
  if (needsCustom)
    return sheetToJSONWithHeaderStrategy(ws, options)

  const raw = options.raw !== false
  return XLSX.utils.sheet_to_json(ws, {
    raw,
    defval: options.keepEmptyCells ? null : undefined,
    blankrows: !!options.keepBlankRows,
  })
}

function genModuleCode (namedSheets: string[], defaultExport: any) {
  const code
    = `export const sheets = ${JSON.stringify(namedSheets)};\n`
      + `export default ${JSON.stringify(defaultExport)};\n`
  return code
}

export function createExcelPlugin (options: ExcelPluginOptions = {}): PluginOption {
  return {
    name: 'vite-plugin-excel',
    enforce: 'pre' as const,

    load (id: string) {
      if (!isExcelLike(id))
        return null
      const { file, query } = parseId(id)
      if (hasReservedViteQuery(query))
        return null

      const all = query.has('all')
      const sheetQuery = query.get('sheet') || undefined

      // 读取文件并解析
      const wb = XLSX.readFile(file)
      const sheetNames = wb.SheetNames || []

      if (sheetNames.length === 0) {
        // 空工作簿
        return genModuleCode([], all ? {} : [])
      }

      // all: 导出所有 sheet （Record<string, rows[]>）
      if (all) {
        const result: Record<string, any[]> = {}
        for (const name of sheetNames) {
          const ws = wb.Sheets[name]
          result[name] = sheetToRows(ws, options)
        }
        return genModuleCode(sheetNames, result)
      }

      // sheet=Name: 导出指定 sheet
      if (sheetQuery) {
        const ws = wb.Sheets[sheetQuery]
        if (!ws) {
          throw new Error(`[vite-plugin-excel] Sheet not found: "${sheetQuery}" in ${file}. Available: ${sheetNames.join(', ')}`)
        }
        const rows = sheetToRows(ws, options)
        return genModuleCode(sheetNames, rows)
      }

      // 默认：首个 sheet
      const firstName = sheetNames[0]
      const ws = wb.Sheets[firstName]
      const rows = sheetToRows(ws, options)
      return genModuleCode(sheetNames, rows)
    },
  }
}
