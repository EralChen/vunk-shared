import { expect, test } from 'vitest'
import { externalUrlRE } from '../externalUrlRE'


test('externalUrlRE.test', () => {
  expect(externalUrlRE.test('https://www.baidu.com')).toBe(true)
  expect(externalUrlRE.test('http://www.baidu.com')).toBe(true)
  expect(externalUrlRE.test('//www.baidu.com')).toBe(true)
  expect(externalUrlRE.test('www.baidu.com')).toBe(false)
  expect(externalUrlRE.test('baidu.com')).toBe(false)
  expect(externalUrlRE.test('baidu')).toBe(false)
})
