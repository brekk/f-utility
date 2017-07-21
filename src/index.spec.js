import test from 'ava'
import * as FUTILITY from './index'

const zort = (x) => x.sort() // eslint-disable-line

const {pipe, filter, isFunction, keys} = FUTILITY

const keySort = pipe(keys, zort)
const onlyFunctions = pipe(
  filter(isFunction),
  keys,
  zort
)

test(`index`, (t) => {
  const futilityKeys = keySort(FUTILITY)
  t.deepEqual(
    futilityKeys,
    zort([
      `$`,
      `I`,
      `K`,
      `PLACEHOLDER`,
      `add`,
      `assign`,
      `choice`,
      `compose`,
      `countNonPlaceholders`,
      `curryObjectByCondition`,
      `curryObjectKN`,
      `curryObjectK`,
      `curryObjectN`,
      `curryPowder`,
      `curry`,
      `curryify`,
      `divide`,
      `every`,
      `expectKArgs`,
      `expectNArgs`,
      `filter`,
      `flip`,
      `fork`,
      `freeze`,
      `isBoolean`,
      `isFunction`,
      `isNil`,
      `isNumber`,
      `isObject`,
      `isTypeof`,
      `iterate`,
      `join`,
      `length`,
      `keys`,
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
      `ternary`,
      `test`,
      `trim`,
      `triplet`,
      `which`
    ])
  )
  const fns = onlyFunctions(FUTILITY)
  t.deepEqual(fns, [
    `I`,
    `K`,
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
    `divide`,
    `every`,
    `expectKArgs`,
    `expectNArgs`,
    `filter`,
    `flip`,
    `fork`,
    `freeze`,
    `isBoolean`,
    `isFunction`,
    `isNil`,
    `isNumber`,
    `isObject`,
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
    `ternary`,
    `test`,
    `trim`,
    `triplet`,
    `which`
  ])
})
