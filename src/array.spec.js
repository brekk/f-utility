/* global test */
import { t } from "jest-t-assert"
import {
  concat,
  symmetricDifference,
  difference,
  join,
  sort,
  alterIndex,
  alterLastIndex,
  alterFirstIndex
} from "./array"

test(`join should be a delegatee last version of array.join(x)`, () => {
  const letters = `abcde`.split(``)
  t.is(join(` `, letters), `a b c d e`)
})

test(`sort should be a delegatee last version of array.sort(fn)`, () => {
  const input = [10, 1, 8, 2, 9, 0]
  t.deepEqual(sort((y, z) => y > z, input), [10, 1, 8, 2, 9, 0])
  t.deepEqual(sort(x => (x % 2 ? -1 : 1), input), [9, 1, 10, 8, 2, 0])
})

test(`symmetricDifference should give a difference between two arrays`, () => {
  const abc = `abc`.split(``)
  const abcde = `abcde`.split(``)
  t.deepEqual(symmetricDifference(abc, abcde), `de`.split(``))
  t.deepEqual(symmetricDifference(abcde, abc), `de`.split(``))
  t.deepEqual(symmetricDifference(abcde, [``]), abcde.concat(``))
})
test(`difference should give the difference`, () => {
  t.deepEqual(difference(`abcde`.split(``), [``]), `abcde`.split(``))
  t.deepEqual(difference(`abcde`.split(``), `cdefg`.split(``)), `ab`.split(``))
})

test(`concat`, () => {
  t.deepEqual(concat(`utts`.split(``), [`b`]), `uttsb`.split(``))
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
