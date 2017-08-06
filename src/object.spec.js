import test from 'ava'
import {pipe} from 'katsu-curry'

import {map} from './map'
import {merge, toPairs, fromPairs} from './object'
import {word} from './random-word'
import {floorMin} from './random-floor'

test(`merge`, (t) => {
  const [a, b] = map(word, [1, 1])
  const [x, y] = map(floorMin, [1e3, 1e3])
  const aObject = {[a]: x}
  const bObject = {[b]: y}
  t.deepEqual(merge(aObject, bObject), {...aObject, ...bObject})
})

test(`toPairs / fromPairs`, (t) => {
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
