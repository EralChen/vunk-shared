import { ffi } from 'win32-api'
import { EnumWindows, lpEnumFuncSpec, ILpEnumFunc, GetWindowTextW } from './koffiLib'
import { Deferred } from '@vunk-shared/promise'
import { ucsBufferToString, HWND } from 'win32-def'
import { Media } from '@vunk-shared/types'


export function getWindowsByText (text: string = '') {

  const def = new Deferred<Media<HWND>[]>()

  const hwnds: Media<HWND>[] = []

  const lpEnumFunc: ILpEnumFunc = (hwnd: number) => {

    const bf = Buffer.alloc(255)
    GetWindowTextW(hwnd, bf, 255)
    const str = ucsBufferToString(bf)

    if (str.includes(text)) {
      hwnds.push({
        value: hwnd,
        label: str,
      })
    }
    return true
  }

  const lpEnumCb = ffi.register(lpEnumFunc, ffi.pointer(lpEnumFuncSpec))

  EnumWindows(lpEnumCb, 0)

  def.promise.then(() => {
    ffi.unregister(lpEnumCb)
  })

  def.resolve(hwnds)

  
  return def.promise
}


