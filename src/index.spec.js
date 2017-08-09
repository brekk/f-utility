/* global test */
import {t} from './test-helpers'
import * as BUNDLE from '../f-utility'
import * as FUTILITY from './index'

const harness = (F) => {
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
      `I`,
      `K`,
      `PLACEHOLDER`,
      `add`,
      `ap`,
      `assign`,
      `chain`,
      `choice`,
      `compose`,
      `curry`,
      `curryObjectK`,
      `curryObjectKN`,
      `curryObjectN`,
      `curryify`,
      `difference`,
      `divide`,
      `entries`,
      `every`,
      `equal`,
      `equals`,
      `filter`,
      `flatMap`,
      `flip`,
      `fork`,
      `fold`,
      `freeze`,
      `fromPairs`,
      `invert`,
      `isArray`,
      `isBoolean`,
      `isDistinctObject`,
      `isFunction`,
      `isNil`,
      `isNumber`,
      `isObject`,
      `isString`,
      `isTypeof`,
      `iterate`,
      `join`,
      `keys`,
      `length`,
      `map`,
      `merge`,
      `multiply`,
      `not`,
      `not1`,
      `not2`,
      `not3`,
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
      `round`,
      `some`,
      `sort`,
      `split`,
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
harness(BUNDLE)
