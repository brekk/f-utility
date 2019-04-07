/* global test */
import { t } from "jest-t-assert"
import { reject } from "./reject"

test(`reject`, () => {
  t.is(typeof reject, `function`)
  const sieve = x => x % 2
  const flt = reject(sieve)
  t.deepEqual(flt([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), [0, 2, 4, 6, 8])
})
