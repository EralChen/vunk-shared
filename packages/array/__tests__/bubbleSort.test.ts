import { expect, it } from 'vitest'
import { bubbleSort } from '../bubbleSort'

it('bubbleSort', async () => {
  const b = bubbleSort([
    { index: undefined, name: 'a' },
    { index: 3 },
    { index: undefined, name: 'b' },
    { index: 2 },
    { index: 1 },
  ])

  expect(b).toEqual([
    { index: undefined, name: 'a' },
    { index: 1 },
    { index: undefined, name: 'b' },
    { index: 2 },
    { index: 3 },
  ])
})

it('bubbleSort deep key', async () => {
  const b = bubbleSort([
    { name: 'a' },
    {
      meta: { index: 3 },
    },
    { name: 'b' },
    {
      meta: { index: 2 },
    },
    {
      meta: { index: 1 },
    },
  ], ['meta', 'index'])

  expect(b).toEqual([
    { name: 'a' },
    { meta: { index: 1 } },
    { name: 'b' },
    { meta: { index: 2 } },
    { meta: { index: 3 } },
  ])
})
