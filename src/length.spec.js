/* global test */
import { t } from "jest-t-assert"
import { objectLength, length } from "./length"

test(`length`, () => {
  t.is(length(`butts`), 5)
  t.is(length(`butts`.split(``)), 5)
})
test(`objectLength`, () => {
  t.is(objectLength({ b: 0, u: 1, t: 2, s: 3 }), 4)
})
