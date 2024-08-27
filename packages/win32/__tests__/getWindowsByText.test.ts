import { test } from 'vitest'
import { getWindowsByText } from '../user32'


test('getWindowsByText', async () => {

  const hwnds = await getWindowsByText('企业微信')

  console.log('hwnds', hwnds)

})