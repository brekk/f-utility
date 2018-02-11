/* global test */
import {t} from 'jest-t-assert'
import * as DEBUG from './debug'

export const harness = (F) => {
  const zort = (x) => x.sort() // eslint-disable-line

  const {
    symmetricDifference,
    pipe,
    keys,
    invert,
    not1,
    not,
    not2,
    not3,
    equal,
    curry,
    divide,
    flip
  } = F

  const keySort = pipe(keys, zort)
  test(`flip should invert parameters for the first two parameters of a given function`, () => {
    const half = divide(2)
    const twoOver = flip(divide)(2)
    const halfThenOverTwo = pipe(half, twoOver)
    t.is(half(5), 2.5)
    t.is(twoOver(5), 0.4)
    t.is(halfThenOverTwo(5), 0.8)
  })

  test(`invert`, () => {
    t.falsy(invert(true))
    t.truthy(invert(false))
  })

  test(`not`, () => {
    const notAHundo = not(equal(100))
    t.truthy(notAHundo(200))
    t.falsy(notAHundo(100))
  })

  test(`not1`, () => {
    const notAHundo = not1(equal, 100)
    t.truthy(notAHundo(200))
    t.falsy(notAHundo(100))
  })

  test(`not2`, () => {
    const ascending = curry((a, b, c) => ((a < b) && (b < c)))
    const isDescending = not2(ascending, 1, 10)
    t.truthy(isDescending(1))
    t.falsy(isDescending(100))
  })

  test(`not3`, () => {
    const ascending = curry((a, b, c, d) => ((a < b) && (b < c) && (c < d)))
    const isDescending = not3(ascending, 1, 10, 100)
    t.truthy(isDescending(1))
    t.falsy(isDescending(1000))
  })

  test(`length`, () => {
    t.is(F.length({a: 1, b: 2, c: 3}), 3)
    t.is(F.length(`abc`), 3)
    t.is(F.length([1, 2, 3]), 3)
  })

  test(`index`, () => {
    t.is(typeof F, `object`)
    const futilityKeys = keySort(F)
    const expected = zort([
      `$`,
      `I`,
      `K`,
      `PLACEHOLDER`,
      `add`,
      `alterFirstIndex`,
      `alterIndex`,
      `alterLastIndex`,
      `ap`,
      `assign`,
      `chain`,
      `charAt`,
      `choice`,
      `codePointAt`,
      `compose`,
      `concat`,
      `curryObjectKN`,
      `curryObjectK`,
      `curryObjectN`,
      `curry`,
      `curryify`,
      `difference`,
      `divide`,
      `endsWith`,
      `entries`,
      `equal`,
      `equals`,
      `every`,
      `filter`,
      `flatMap`,
      `flip`,
      `fold`,
      `fork`,
      `freeze`,
      `fromPairs`,
      `indexOf`,
      `invert`,
      `isArray`,
      `isBoolean`,
      `isDistinctObject`,
      `isFunction`,
      `isNil`,
      `isNumber`,
      `isObject`,
      `isPOJO`,
      `isString`,
      `isTypeof`,
      `iterate`,
      `join`,
      `keys`,
      `lastIndexOf`,
      `length`,
      `mapKeys`,
      `mapTuple`,
      `mapTuples`,
      `map`,
      `match`,
      `merge`,
      `multiply`,
      `not1`,
      `not2`,
      `not3`,
      `not`,
      `padEnd`,
      `padStart`,
      `pairwiseObject`,
      `pairwise`,
      `pathEq`,
      `pathIs`,
      `pathOr`,
      `path`,
      `pipe`,
      `pow`,
      `propEq`,
      `propIs`,
      `propOr`,
      `prop`,
      `random`,
      `range`,
      `reduce`,
      `reject`,
      `relativeIndex`,
      `remapArray`,
      `remap`,
      `repeat`,
      `replace`,
      `round`,
      `search`,
      `some`,
      `sort`,
      `split`,
      `startsWith`,
      `substr`,
      `subtract`,
      `symmetricDifference`,
      `ternary`,
      `toPairs`,
      `trim`,
      `triplet`,
      `which`
    ])
    const sillyPowerAssert = symmetricDifference(expected, futilityKeys)
    t.deepEqual(sillyPowerAssert, [])
    t.deepEqual(
      futilityKeys,
      expected
    )
  })
}
harness(DEBUG)
