import { User32 } from 'win32-api'
import type * as T from 'win32-def/types'
import { user32dll } from './user32dll'


interface IGetWindowTextW {
  (hWnd: T.HWND, lpString: T.LPCTSTR, nMaxCount: T.INT): T.INT
}

const dps = User32.DefUser32.GetWindowTextW as [never, never]
export const GetWindowTextW: IGetWindowTextW = user32dll
  .func('GetWindowTextW', ...dps)
