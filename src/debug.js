import _flatMap from 'flatmap-fast'
import fastReduce from 'fast.js/reduce'
import fastFilter from 'fast.js/filter'
import fastSome from 'fast.js/array/some'
import fastEvery from 'fast.js/array/every'
import {e0, e1, e2} from 'entrust/debug'
import {
  curry as __curry,
  pipe as __pipe,
  compose as __compose
} from 'katsu-curry/debug'
import {__ap} from './ap'
import {
  __isTypeof,
  isDistinctObject as __isDistinctObject,
  isNil as __isNil
} from './types'
import {__choice} from './choice'
import {__iterate} from './iterate'
import {__map} from './map'
import {__range} from './range'
import {__reject} from './reject'
import {__ternary} from './ternary'
import {__triplet} from './triplet'
import {
  __merge,
  __pairwise,
  __pairwiseObject,
  fromPairs as __fromPairs,
  toPairs as __toPairs
} from './object'

import {invert as _invert} from './invert'
import {
  __endsWith,
  __indexOf,
  __lastIndexOf,
  __startsWith
} from './string'
import {
  __sort,
  __symmetricDifference,
  __difference,
  __alterIndex,
  __relativeIndex
} from './array'
import {
  __delegateFastBinary,
  __delegateFastTertiary
} from './delegate-fast'
import {
  __equals,
  __add,
  __subtract,
  __divide,
  __multiply,
  __pow,
  round as __round
} from './math'
import {
  __pathOr,
  __propOr,
  __pathEq,
  __pathIs,
  __propIs,
  __propEq
} from './path'

import {random as _random} from './random'
import * as f from './random-floor'
import * as t from './random-take'
import * as w from './random-word'
import * as s from './random-shuffle'

export const round = __round
round.toString = () => `~(?)`
export const random = Object.assign(_random, f, t, w, s)
random.toString = () => `👾 (?)`

export const curry = __curry
curry.toString = () => `🍛 (?)`
export const pipe = __pipe
pipe.toString = () => `🍡 (?)`
export const compose = __compose
compose.toString = () => `🙃 🍡 (?)`

export const isDistinctObject = __isDistinctObject
isDistinctObject.toString = () => `isTrueObject(?)`
export const isPOJO = isDistinctObject

export {
  keys,
  assign,
  freeze,
  entries
} from './object'
export const toPairs = __toPairs
toPairs.toString = () => `ᗕ(?)`
export const fromPairs = __fromPairs
fromPairs.toString = () => `ᗒ(?)`
export {
  isArray
} from './types'

export const isNil = curry(__isNil)
isNil.toString = () => `curry(__isTypeof)(null)(?)`

export const trim = e0(`trim`)

export const charAt = e1(`charAt`)
export const codePointAt = e1(`codePointAt`)
export const concat = e1(`concat`)
export const fold = e2(`fold`)
export const fork = e2(`fork`)
export const join = e1(`join`)
export const match = e1(`match`)
export const repeat = e1(`repeat`)
export const search = e1(`search`)
export const split = e1(`split`)

// const endsWithLength = e2(`endsWith`)
// const indexOfFromIndex = e2(`indexOf`)
// export const lastIndexOfFromIndex = e2(`lastIndexOf`)
export const padEnd = e2(`padEnd`)
export const padStart = e2(`padStart`)
export const replace = e2(`replace`)
// export const startsWithFromPosition = e2(`startsWith`)
export const substr = e2(`substr`)

// BINARY

export const isTypeof = curry(__isTypeof)
export const isBoolean = isTypeof(`boolean`)
export const isNumber = isTypeof(`number`)
export const isFunction = isTypeof(`function`)
export const isString = isTypeof(`string`)
export const isObject = isTypeof(`object`)
// const delegateFastBinary = curry(__delegateFastBinary)
// const delegateFastTertiary = curry(__delegateFastTertiary)

export const add = curry(__add)
export const alterIndex = curry(__alterIndex)
export const ap = curry(__ap)
export const choice = curry(__choice)
export const difference = curry(__difference)
export const divide = curry(__divide)
export const endsWith = curry(__endsWith)
export const equal = curry(__equals)
export const equals = equal
export const indexOf = curry(__indexOf)
export const iterate = curry(__iterate)
export const lastIndexOf = curry(__lastIndexOf)
export const map = curry(__map)
export const merge = curry(__merge)
export const multiply = curry(__multiply)
export const pairwise = curry(__pairwise)
export const pairwiseObject = curry(__pairwiseObject)
export const pathEq = curry(__pathEq)
export const pathIs = curry(__pathIs)
export const pathOr = curry(__pathOr)
export const path = pathOr(null)
export const pow = curry(__pow)
export const propEq = curry(__propEq)
export const propIs = curry(__propIs)
export const propOr = curry(__propOr)
export const prop = propOr(null)
export const range = curry(__range)
export const reject = curry(__reject)
export const relativeIndex = curry(__relativeIndex)
export const sort = curry(__sort)
export const startsWith = curry(__startsWith)
export const subtract = curry(__subtract)
export const symmetricDifference = curry(__symmetricDifference)
export const ternary = curry(__ternary)
export const triplet = curry(__triplet)

export const chain = curry(function __chain(fn, functor) {
  return __delegateFastBinary(`chain`, _flatMap, fn, functor)
})
export const flatMap = chain
export const filter = curry(function __filter(fn, functor) {
  return __delegateFastBinary(`filter`, fastFilter, fn, functor)
})

export const reduce = curry(function __reduce(fn, initial, functor) {
  return __delegateFastTertiary(`reduce`, fastReduce, fn, initial, functor)
})

export const mapTuples = pairwiseObject(map)
export const mapTuple = mapTuples
const __mapKeys = (fn, o) => mapTuples(
  ([k, v]) => ([fn(k), v]),
  o
)
export const mapKeys = curry(__mapKeys)

export const flip = (fn) => curry(function __flip(a, b) {
  return fn(b, a)
})
flip.toString = () => `🙃 🍛 (?)`

export const alterLastIndex = alterIndex(-1)
export const alterFirstIndex = alterIndex(0)
export const invert = _invert
export const not = (fn) => pipe(
  fn,
  invert
)
not.toString = () => `❗️(?)`
export const not1 = curry((fn, a) => pipe(
  fn(a),
  invert
))
not1.toString = () => `❗️1(?,?)`
export const not2 = curry((fn, a, b) => pipe(
  fn(a, b),
  invert
))
not2.toString = () => `❗️2(?,?,?)`
export const not3 = curry((fn, a, b, c) => pipe(
  fn(a, b, c),
  invert
))
not3.toString = () => `❗️3(?,?,?,?)`

const propLength = prop(`length`)
const objectLength = pipe(Object.keys, propLength)
export const length = (x) => (
  typeof x === `object` ?
    objectLength(x) :
    propLength(x)
)
length.toString = () => `length(?)`

export const which = curry(function __which(compare, fn, o) {
  // allows us to pass functions to compare first
  const arecomp = flip(compare)
  return triplet(
    Array.isArray,
    arecomp(fn),
    pipe(
      Object.keys,
      arecomp((key) => fn(o[key], key))
    ),
    o
  )
})
fastSome.toString = () => `some`
export const some = which(fastSome)
fastEvery.toString = () => `every`
export const every = which(fastEvery)
export {
  $,
  PLACEHOLDER,
  curryify,
  curryObjectK,
  curryObjectN,
  curryObjectKN,
  remap,
  remapArray,
  K,
  I
} from 'katsu-curry/debug'
