import test from 'ava'
import {filterObject} from '../../src/fp/filter-object'

test(`filterKeys should throw when it receives a non-function filter`, (t) => {
  t.plan(3)
  t.is(typeof filterObject, `function`)
  t.is(typeof filterObject(() => {}), `function`)
  t.throws(() => filterObject(null, {}))
})

test(`filterKeys should throw when it receives a non-object to filter`, (t) => {
  t.plan(1)
  t.throws(() => filterObject(() => true, null))
})

test(`filterKeys should allow filtering of an object by its keys`, (t) => {
  t.plan(2)
  const input = {
    _a: 1,
    _b: 2,
    _c: 3,
    a: 4,
    b: 5,
    c: 6
  }
  const keyFilter = (lookup) => ([k]) => { return (k.indexOf(lookup) > -1) }
  const filters = {
    under: keyFilter(`_`),
    b: keyFilter(`b`)
  }
  const output = filterObject(filters.under, input)
  t.deepEqual(output, {_a: 1, _b: 2, _c: 3})
  const output2 = filterObject(filters.b, input)
  t.deepEqual(output2, {_b: 2, b: 5})
})
