import test from 'ava'
import * as FUTILITY from './index'

const zort = (x) => x.sort() // eslint-disable-line

const {pipe, keys} = FUTILITY

const keySort = pipe(keys, zort)
// const onlyFunctions = pipe(
//   filter(isFunction),
//   keys,
//   zort
// )

test(`index`, (t) => {
  const futilityKeys = keySort(FUTILITY)
  const expected = zort([
    `$`,
    `I`,
    `K`,
    `PLACEHOLDER`,
    `add`,
    `assign`,
    `choice`,
    `compose`,
    `countNonPlaceholders`,
    `curry`,
    `curryObjectByCondition`,
    `curryObjectK`,
    `curryObjectKN`,
    `curryObjectN`,
    `curryPowder`,
    `curryify`,
    `difference`,
    `divide`,
    `every`,
    `expectKArgs`,
    `expectNArgs`,
    `filter`,
    `flip`,
    `fork`,
    `freeze`,
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
    `multiply`,
    `pipe`,
    `pow`,
    `random`,
    `reduce`,
    `reject`,
    `some`,
    `split`,
    `subtract`,
    `symmetricDifference`,
    `ternary`,
    `test`,
    `trim`,
    `triplet`,
    `which`
  ])
  t.deepEqual(
    futilityKeys,
    expected
  )
})
