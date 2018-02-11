/* global test */
import {t} from 'jest-t-assert'
import {triplet} from './triplet'
import {divide, multiply} from './math'

test(`triplet`, () => {
  const a = (i) => i % 2
  const b = divide(2)
  const c = multiply(2)
  const x = triplet(a, b, c)
  t.is(x(100), 50)
  t.is(x(101), 202)
})
