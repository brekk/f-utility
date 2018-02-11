/* global test */
import {t} from 'jest-t-assert'
import {
  concat,
  symmetricDifference,
  difference,
  join,
  sort,
  alterIndex,
  alterLastIndex,
  alterFirstIndex
} from './array'

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

test(`concat`, () => {
  t.deepEqual(concat(`utts`.split(``), [`b`]), `butts`.split(``))
})

test(`alterIndex`, () => {
  t.is(typeof alterIndex, `function`)
  const output = alterIndex(1, () => `x`, `abc`.split(``))
  t.deepEqual(output, `axc`.split(``))
})

test(`alterFirstIndex, alterIndex zero`, () => {
  t.is(typeof alterFirstIndex, `function`)
  const input = `abc`.split(``)
  const X = () => `x`
  const output = alterIndex(0, X, input)
  const output2 = alterFirstIndex(X, input)
  t.deepEqual(output, `xbc`.split(``))
  t.deepEqual(output2, output)
})

test(`alterIndex with negative index`, () => {
  const output = alterIndex(-2, () => `x`, `abc`.split(``))
  t.deepEqual(output, `axc`.split(``))
})

test(`alterLastIndex`, () => {
  t.is(typeof alterLastIndex, `function`)
  const output = alterLastIndex(() => `x`, `abc`.split(``))
  t.deepEqual(output, `abx`.split(``))
})
