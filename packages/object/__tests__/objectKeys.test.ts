import { expect, test } from "vitest";
import { objectKeys } from "../objectKeys";


  
test("objectKeys", () => {
  const obj = { a: 1, b: 2, c: 3 }
  const keys = objectKeys(obj)
  expect(keys).toEqual(["a", "b", "c"])
});
