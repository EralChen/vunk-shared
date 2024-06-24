import { expect, test } from "vitest";
import { isPlainObject } from "../isPlainObject";

test("isPlainObject", () => {
  expect(isPlainObject({})).toBe(true);
  expect(isPlainObject(Object.create(null))).toBe(true);


  expect(isPlainObject([])).toBe(false);
  expect(isPlainObject(new Date())).toBe(false);
  expect(isPlainObject(null)).toBe(false);
  expect(isPlainObject(undefined)).toBe(false);
});