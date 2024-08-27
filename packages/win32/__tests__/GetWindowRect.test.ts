import { test } from 'vitest'
import { getWindowsByText, getWindowRect } from '../user32'
import { GetWindowRect } from '../user32/koffiLib'
import { RECT_Factory } from 'win32-def/struct'


test('GetWindowRect', async () => {

  const hwnds = await getWindowsByText('企业微信')

  const { payload, pointer } = RECT_Factory()

  console.log('payload', payload)
  console.log('pointer', pointer)
    



  const { payload: payload1, pointer: pointer2 } = RECT_Factory()

  console.log('payload1', payload1)
  console.log('pointer2', pointer2)



  GetWindowRect(hwnds[1].value, payload1)

  GetWindowRect(hwnds[0].value, payload)

  console.log('payload1', payload1)
  console.log('payload', payload)


})



test('getWindowRect', async () => {
  const hwnds = await getWindowsByText('企业微信')

  for (const hwnd of hwnds) {
    const rect = getWindowRect(hwnd.value)
    console.log('rect', rect)
  }

})
