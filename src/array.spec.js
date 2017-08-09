/* global test */
import {t} from './test-helpers'
import {symmetricDifference, difference, join, sort} from './array'

test(`join should be a delegatee last version of array.join(x)`, () => {
  const letters = `abcde`.split(``)
  t.is(join(` `, letters), `a b c d e`)
})

test(`sort should be a delegatee last version of array.sort(fn)`, () => {
  const I = (x) => x
  const input = [10, 1, 8, 2, 9, 0]
  t.deepEqual(sort(I, input), [0, 9, 2, 8, 1, 10])
  t.deepEqual(sort((x) => (x % 2 ? -1 : 1), input), [1, 9, 0, 2, 8, 10])
})

test(`symmetricDifference should give a difference between two arrays`, () => {
  const abc = `abc`.split(``)
  const abcde = `abcde`.split(``)
  const de = `de`.split(``)
  t.deepEqual(symmetricDifference(abc, abcde), de)
  t.deepEqual(symmetricDifference(abcde, abc), de)
  t.deepEqual(symmetricDifference(abcde, [``]), abcde)
  t.deepEqual(difference(abcde, [``]), [``])
})
