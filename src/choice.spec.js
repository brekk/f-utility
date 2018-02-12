/* global test */
import {t} from 'jest-t-assert'
import {choice} from './choice'

test(`choice should be a curried binary fn whose initial input takes the comparison items`, () => {
  const comparison = (x, y) => x === 5 || y === 2
  const a = 10
  const b = 2
  const c = 5
  const compare = choice(comparison)
  t.is(compare(a, b), a)
  t.is(compare(b, a), a)
  t.is(compare(b, c), c)
  t.is(compare(c, a), c)
  t.is(compare(a, a), a)
})
