import { expect, test } from 'vitest'
import { EnumWindows, lpEnumFuncSpec, user32dll } from '../user32/koffiLib'
import { ffi } from 'win32-api'


test('EnumWindows', async () => {

  function lpEnumFunc(hwnd: number, lParam: number) {
    console.log('hwnd', hwnd, 'lParam', lParam)
    return true
  }
  const lpEnumCb = ffi.register(lpEnumFunc, ffi.pointer(lpEnumFuncSpec))
  const res = EnumWindows(lpEnumCb, 0)
  ffi.unregister(lpEnumCb)
  console.log('res', res)
  expect(res).toBe(true)



})


