/* global test */
import {pipe} from 'katsu-curry'
import {t} from 'germs'

import {map} from './map'
import {filter} from './filter'
import {reject} from './reject'
import {
  augmentTuples,
  values,
  merge,
  toPairs,
  fromPairs,
  mapTuple,
  mapKeys
} from './object'
import {word} from './random-word'
import {floorMin} from './random-floor'

test(`values`, () => {
  const output = values({a: 1, b: 2, c: 3})
  t.deepEqual(output, [1, 2, 3])
})

test(`merge`, () => {
  const [a, b] = map(word, [1, 1])
  const [x, y] = map(floorMin, [1e3, 1e3])
  const aObject = {[a]: x}
  const bObject = {[b]: y}
  t.deepEqual(merge(aObject, bObject), {...aObject, ...bObject})
})

test(`toPairs / fromPairs`, () => {
  const doubleEvenValues = pipe(
    toPairs,
    map(([k, v]) => [k, v % 2 === 0 ? v * 2 : v]),
    fromPairs
  )
  const input = {a: 1, b: 2, c: 3, d: 4}
  const expected = {
    a: 1,
    b: 4,
    c: 3,
    d: 8
  }
  t.deepEqual(doubleEvenValues(input), expected)
  t.deepEqual(fromPairs([[1, 2], [`a`, `b`]]), {1: 2, a: `b`})
})

test(`augmentTuple`, () => {
  const input = {
    a: 1,
    b: 2,
    c: 3
  }
  const fn = (x) => x[1] % 2 !== 0
  const output = augmentTuples(filter, fn, input)
  const output2 = augmentTuples(reject, fn, input)
  t.deepEqual(output, {a: 1, c: 3})
  t.deepEqual(output2, {b: 2})
})

test(`mapTuple`, () => {
  const input = {
    a: 1,
    b: 2,
    c: 3
  }
  const fn = ([k, v]) => ([k.toUpperCase(), v * 2])
  const output = mapTuple(fn, input)
  t.deepEqual(output, {A: 2, B: 4, C: 6})
})

test(`mapKeys`, () => {
  const input = {
    a: 1,
    b: 2,
    c: 3
  }
  const fn = (v) => `__${v}`
  const output = mapKeys(fn, input)
  t.deepEqual(output, {__a: 1, __b: 2, __c: 3})
})
