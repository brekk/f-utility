import test from 'ava'
import {ternary} from './ternary'

test(`ternary`, (t) => {
  const [a, b] = `ab`.split(``)
  t.is(ternary(true, b, a), a)
  t.is(ternary(false, b, a), b)
})
