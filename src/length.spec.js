/* global test */
import {t} from 'jest-t-assert'
import {length} from './length'

test(`iterate`, () => {
  t.is(length(`butts`), 5)
  t.is(length(`butts`.split(``)), 5)
  t.is(length({b: 0, u: 1, t: 2, s: 3}), 4)
})
