/* global test */
import {t} from './test-helpers'
import {pipe, I} from 'katsu-curry'
import mapR from 'ramda/src/map'
import {Left} from 'fantasy-eithers'
import FL from 'fantasy-land'
import {map} from './map'

test(`map`, () => {
  t.is(typeof map, `function`)
  t.is(typeof map(I), `function`)
  const double = (x) => x * 2
  const partialIdentity = map(I)
  const partialDouble = map(double)
  const abcO = {a: 1, b: 2, c: 3}
  const three = [1, 2, 3]
  const abc = `abc`.split(``)
  t.deepEqual(map(I, abc), abc)
  t.deepEqual(partialIdentity(abc), abc)
  t.deepEqual(map(I, three), three)
  t.deepEqual(map(double, three), [2, 4, 6])
  t.deepEqual(partialDouble(three), [2, 4, 6])
  t.deepEqual(map(I, abcO), abcO)
  t.deepEqual(partialIdentity(abcO), abcO)
  t.deepEqual(map(double, abcO), {a: 2, b: 4, c: 6})
  t.deepEqual(partialDouble(abcO), {a: 2, b: 4, c: 6})
  t.deepEqual(partialDouble(abcO, {}), {a: 2, b: 4, c: 6})
})

const doubleX = pipe(
  ({x}) => ({x: x * 2})
)
const ourDoubler = map(doubleX)
const theirDoubler = mapR(doubleX)

test(`map should work like ramda's map`, () => {
  const toUpper = (x) => x.toUpperCase()
  const ours = map(toUpper)
  const theirs = map(toUpper)
  const input = `123aBcDeF`
  t.deepEqual(ours(input), theirs(input))
  const input2 = `123aBcDeF`.split(``)
  t.deepEqual(ours(input2), theirs(input2))
  const immutable = Left({x: 100})
  t.deepEqual(theirDoubler(immutable), immutable)
  t.deepEqual(ourDoubler(immutable), immutable)
})
test(`map should delegate to fantasy-land map, if present`, () => {
  function MyFunctor(x) {
    if (!(this instanceof MyFunctor)) {
      return new MyFunctor(x)
    }
    this.value = x
    return this
  }
  MyFunctor.prototype[FL.map] = function fantasyMap(fn) {
    return MyFunctor(fn(this.value))
  }
  const custom = MyFunctor({x: 100})
  t.is(theirDoubler(custom).value.x, custom.value.x * 2)
  t.is(ourDoubler(custom).value.x, custom.value.x * 2)
})
