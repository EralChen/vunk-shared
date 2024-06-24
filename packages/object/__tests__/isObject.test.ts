import { expect, test } from "vitest";
import { isObject } from "../isObject";


test("isObject", () => {
  expect(isObject({})).toBe(true);
  expect(isObject([])).toBe(true);
  expect(isObject(new Date())).toBe(true);
  expect(isObject(null)).toBe(false);
  expect(isObject(undefined)).toBe(false);
});