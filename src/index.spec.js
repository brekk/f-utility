import test from 'ava'
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

  test(`index`, (t) => {
    t.is(typeof F, `object`)
    const futilityKeys = keySort(F)
    const expected = zort([
      `$`,
      `I`,
      `K`,
      `PLACEHOLDER`,
      `add`,
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
      `every`,
      `equal`,
      `equals`,
      `filter`,
      `flatMap`,
      `flip`,
      `fork`,
      `freeze`,
      `invert`,
      `isArray`,
      `isBoolean`,
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
      `reduce`,
      `reject`,
      `round`,
      `some`,
      `sort`,
      `split`,
      `subtract`,
      `symmetricDifference`,
      `ternary`,
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
