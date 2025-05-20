import { expect, it } from 'vitest'
import { bubbleSort } from '../bubbleSort'

it('bubbleSort', async () => {
  const b = bubbleSort([
    { index: undefined, name: 'a' },
    { index: 3 },
    { index: undefined, name: 'b' },
    { index: undefined, name: 'c' },
    { index: 2 },
    { index: 1 },
  ])

  expect(b).toEqual([
    { index: undefined, name: 'a' },
    { index: 1 },
    { index: undefined, name: 'b' },
    { index: undefined, name: 'c' },
    { index: 2 },
    { index: 3 },
  ])
})

it('bubbleSort deep key', async () => {
  const b = bubbleSort([
    {
      meta: { index: 3 },
    },
    {
      meta: { index: 2 },
    },
    {
      meta: { index: 1 },
    },
  ], ['meta', 'index'])

  expect(b).toEqual([

    { meta: { index: 1 } },

    { meta: { index: 2 } },

    { meta: { index: 3 } },
  ])
})
