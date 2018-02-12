/* global test */
import {t} from 'jest-t-assert'
import {ternary} from './ternary'

test(`ternary`, () => {
  const [a, b] = `ab`.split(``)
  t.is(ternary(true, b, a), a)
  t.is(ternary(false, b, a), b)
})
