import test from 'ava'
import {filter} from './filter'

test(`filter`, (t) => {
  t.is(typeof filter, `function`)
  const sieve = (x) => !(x % 2)
  const flt = filter(sieve)
  t.deepEqual(flt([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), [0, 2, 4, 6, 8])
})
