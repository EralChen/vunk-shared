import type * as T from 'win32-def/types'
import { RECT_Type, RECT_Factory } from 'win32-def/struct'
import { user32dll } from './user32dll'



/**
 * 
 * BOOL GetWindowRect(
  [in]  HWND   hWnd,
  [out] LPRECT lpRect
);
 */
interface IGetWindowRect {
  (hWnd: T.HWND, lpRect: RECT_Type): T.BOOL
}

const { pointer } = RECT_Factory()

export const GetWindowRect: IGetWindowRect = user32dll.func('GetWindowRect', 'bool', ['int', `_Out_ ${pointer}`])







