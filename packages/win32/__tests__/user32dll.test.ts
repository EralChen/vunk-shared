import { test } from 'vitest'
import { POINT_Factory  } from 'win32-def/struct'
import { user32dll } from '../user32/koffiLib'


test('should pass', async () => {
  
  const { payload: pos, pointer } = POINT_Factory()
  const func = user32dll.func('GetCursorPos', 'int', [`_Out_ ${pointer}`])
  const res = func(pos)

  console.log('res:', res)

})
