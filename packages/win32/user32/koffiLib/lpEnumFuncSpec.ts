import { ffi } from 'win32-api'



export interface ILpEnumFunc {
  (hwnd: number, lParam: number): boolean
}

/**
 * @link
 * https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-enumwindows#parameters
 * @example
  function lpEnumFunc(hwnd: number, lParam: number) {
  }
  const lpEnumCb =  ffi.register(lpEnumFunc, ffi.pointer(lpEnumFuncSpec))
  const EnumWindows = user32.func('EnumWindows', 'bool', ['lpEnumFunc*', 'int']);
  const res = EnumWindows(lpEnumCb, 0)
 */
export const lpEnumFuncSpec = ffi.proto('lpEnumFunc', 'bool', ['int', 'int'])


