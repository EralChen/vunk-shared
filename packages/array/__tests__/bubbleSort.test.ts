import { expect, test } from "vitest";
import { bubbleSort } from '../bubbleSort'


test("bubbleSort", async () => {

  const b = bubbleSort([
    { index: undefined, name: 'a' },
    { index: 3 },
    { index: undefined, name: 'b' },
    { index: 2 },
    { index: 1 },
  ])


  b
  
})