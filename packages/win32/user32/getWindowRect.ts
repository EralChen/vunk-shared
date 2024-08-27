import { GetWindowRect } from './koffiLib/GetWindowRect'
import { RECT_Factory } from 'win32-def/struct'
import { HWND } from 'win32-def'


export function getWindowRect (hwnd: HWND) {

  const { payload } = RECT_Factory()

  GetWindowRect(hwnd, payload)

  return payload
}



