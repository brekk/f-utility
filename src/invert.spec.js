/* global test */
import { t } from "jest-t-assert"
import { invert, not } from "./invert"

test(`not`, () => {
  t.falsy(not(true))
  t.truthy(not(false))
})

test(`invert`, () => {
  t.deepEqual(invert({ a: 1, b: 2, c: 1, d: 2, e: 1 }), {
    1: [`a`, `c`, `e`],
    2: [`b`, `d`]
  })
})
