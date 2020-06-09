import { call, apply } from "./native"

/* eslint-disable func-style */
test("call", () => {
  const ternary = (x, y, z) => (x + y) / z
  expect(call([ternary, 1, 2, 3])).toEqual(1)
  expect(call([ternary, 4, 2, 3])).toEqual(2)
})

test("apply", () => {
  expect(apply(Math.max, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1])).toEqual(10)
})

/* eslint-enable func-style */
