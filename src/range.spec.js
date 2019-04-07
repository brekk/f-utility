/* global test */
import { t } from "jest-t-assert"
import { range } from "./range"

test(`range should do positive numbers`, () => {
  t.deepEqual(range(0, 5), [0, 1, 2, 3, 4])
  t.deepEqual(range(5, 0), [5, 4, 3, 2, 1])
})
test(`range should do positive and negative numbers`, () => {
  t.deepEqual(range(-5, 5), [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4])
  t.deepEqual(range(5, -5), [5, 4, 3, 2, 1, 0, -1, -2, -3, -4])
})
test(`range should do negative numbers`, () => {
  t.deepEqual(range(-5, 0), [-5, -4, -3, -2, -1])
  t.deepEqual(range(-15, -5), [-15, -14, -13, -12, -11, -10, -9, -8, -7, -6])
  t.deepEqual(range(0, -5), [0, -1, -2, -3, -4])
})
