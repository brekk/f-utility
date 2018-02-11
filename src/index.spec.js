/* global test */
import {t} from 'jest-t-assert'
import * as FUTILITY from './index'
console.log(`typeof F`, FUTILITY, typeof FUTILITY)

export const harness = (F) => {
  const zort = (x) => x.sort() // eslint-disable-line

  const {symmetricDifference, reject, isFunction, pipe, keys, map} = F

  const keySort = pipe(keys, zort)
  const nonFunctions = (x) => pipe(
    keys,
    map((k) => {
      const v = x[k]
      if (!isFunction(v)) {
        return k
      }
    }),
    reject((y) => !y),
    zort
  )(x)

  test(`index`, () => {
    t.is(typeof F, `object`)
    const futilityKeys = keySort(F)
    const expected = zort([
      `$`,
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
      `curry`,
      `curryify`,
      `curryObjectK`,
      `curryObjectKN`,
      `curryObjectN`,
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
      `I`,
      `indexOf`,
      `invert`,
      `isArray`,
      `isBoolean`,
      `isDistinctObject`,
      `isPOJO`,
      `isFunction`,
      `isNil`,
      `isNumber`,
      `isObject`,
      `isString`,
      `isTypeof`,
      `iterate`,
      `join`,
      `K`,
      `keys`,
      `lastIndexOf`,
      `length`,
      `map`,
      `mapKeys`,
      `mapTuple`,
      `mapTuples`,
      `match`,
      `merge`,
      `multiply`,
      `not`,
      `not1`,
      `not2`,
      `not3`,
      `padEnd`,
      `padStart`,
      `pairwise`,
      `pairwiseObject`,
      `path`,
      `pathEq`,
      `pathIs`,
      `pathOr`,
      `pipe`,
      `PLACEHOLDER`,
      `pow`,
      `prop`,
      `propEq`,
      `propIs`,
      `propOr`,
      `random`,
      `range`,
      `reduce`,
      `reject`,
      `relativeIndex`,
      `remap`,
      `remapArray`,
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
      `version`,
      `which`
    ])
    const sillyPowerAssert = symmetricDifference(expected, futilityKeys)
    t.deepEqual(sillyPowerAssert, [])
    t.deepEqual(
      futilityKeys,
      expected
    )
    const nonMethods = nonFunctions(F)
    t.deepEqual(nonMethods, [`version`])
  })
}
harness(FUTILITY)
