import { ffi } from 'win32-api'

export const user32dll = ffi.load('user32.dll')

