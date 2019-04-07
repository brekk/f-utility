/* global test */
import { t } from "jest-t-assert"
import * as FUTILITY from "./index"

export const harness = F => {
  const zort = x => x.sort() // eslint-disable-line

  const { symmetricDifference, reject, isFunction, pipe, keys, map } = F

  const keySort = pipe(
    keys,
    zort
  )
  const nonFunctions = x =>
    pipe(
      keys,
      map(k => {
        const v = x[k]
        if (!isFunction(v)) {
          return k
        }
      }),
      reject(y => !y),
      zort
    )(x)

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
      `not`,
      `padEnd`,
      `padStart`,
      `pairwiseObject`,
      `pairwise`,
      `pathEq`,
      `pathOr`,
      `pathSatisfies`,
      `path`,
      `pipe`,
      `pow`,
      `propEq`,
      `propIs`,
      `propOr`,
      `propSatisfies`,
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
      `version`,
      `which`
    ])
    const sillyPowerAssert = symmetricDifference(expected, futilityKeys)
    t.deepEqual(sillyPowerAssert, [])
    t.deepEqual(futilityKeys, expected)
    const nonMethods = nonFunctions(F)
    t.deepEqual(nonMethods, [`version`])
  })
}
harness(FUTILITY)
