import test from 'ava'
import {some, every} from './which'

test(`some`, (t) => {
  t.truthy(some((x) => x === `j`, [`j`, `k`, `l`]))
  t.falsy(some((x) => x === `j`, [`k`, `l`, `m`]))
})
test(`every`, (t) => {
  t.truthy(every((x) => typeof x === `number`, [0, 1, 2, 3, 4]))
  t.falsy(every((x) => typeof x === `number`, [0, 1, `twenty`, 3, 4]))
})
