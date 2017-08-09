/* global test */
import {t} from './test-helpers'
import {some, every} from './which'

test(`some`, () => {
  t.truthy(some((x) => x === `j`, [`j`, `k`, `l`]))
  t.falsy(some((x) => x === `j`, [`k`, `l`, `m`]))
})
test(`every`, () => {
  t.truthy(every((x) => typeof x === `number`, [0, 1, 2, 3, 4]))
  t.falsy(every((x) => typeof x === `number`, [0, 1, `twenty`, 3, 4]))
})
