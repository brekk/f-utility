import _flatMap from 'flatmap-fast'
import fastReduce from 'fast.js/reduce'
import fastFilter from 'fast.js/filter'
import fastSome from 'fast.js/array/some'
import fastEvery from 'fast.js/array/every'
import {custom} from 'entrust'
import * as KATSU_DEBUG from 'katsu-curry/debug'

import {𝘍ap} from './ap'
import {
  𝘍isTypeof,
  isDistinctObject as 𝘍isDistinctObject,
  isNil as 𝘍isNil
} from './types'
import {𝘍choice} from './choice'
import {𝘍iterate} from './iterate'
import {𝘍map} from './map'
import {𝘍range} from './range'
import {𝘍reject} from './reject'
import {𝘍ternary} from './ternary'
import {𝘍triplet} from './triplet'
import {
  𝘍merge,
  𝘍pairwise,
  𝘍pairwiseObject,
  fromPairs as 𝘍fromPairs,
  toPairs as 𝘍toPairs
} from './object'

import {invert as _invert} from './invert'
import {
  𝘍endsWith,
  𝘍indexOf,
  𝘍lastIndexOf,
  𝘍startsWith
} from './string'
import {
  𝘍sort,
  𝘍symmetricDifference,
  𝘍difference,
  𝘍alterIndex,
  𝘍relativeIndex
} from './array'
import {
  𝘍delegateFastBinary,
  𝘍delegateFastTertiary
} from './delegate-fast'
import {
  𝘍equals,
  𝘍add,
  𝘍subtract,
  𝘍divide,
  𝘍multiply,
  𝘍pow,
  round as 𝘍round
} from './math'
import {
  𝘍pathOr,
  𝘍propOr,
  𝘍pathEq,
  𝘍pathIs,
  𝘍propIs,
  𝘍propEq
} from './path'
import {random as _random} from './random'
import * as f from './random-floor'
import * as t from './random-take'
import * as w from './random-word'
import * as s from './random-shuffle'
export const round = 𝘍round
round.toString = () => `~(?)`
export const random = Object.assign(_random, f, t, w, s)
random.toString = () => `👾 (?)`
export const {curry, pipe, compose} = KATSU_DEBUG
pipe.toString = () => `🍡 (?)`
compose.toString = () => `🙃 🍡 (?)`
curry.toString = () => `🍛 (?)`

export const isDistinctObject = 𝘍isDistinctObject
isDistinctObject.toString = () => `isTrueObject(?)`
export const isPOJO = isDistinctObject

export const {
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
} = KATSU_DEBUG
export {
  keys,
  assign,
  freeze,
  entries
} from './object'
export const toPairs = 𝘍toPairs
toPairs.toString = () => `ᗕ(?)`
export const fromPairs = 𝘍fromPairs
fromPairs.toString = () => `ᗒ(?)`
export {
  isArray
} from './types'

const entrust = custom(curry)
export const isNil = curry(𝘍isNil)
isNil.toString = () => `curry(𝘍isTypeof)(null)(?)`

const {e0, e1, e2} = entrust

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

export const isTypeof = curry(𝘍isTypeof)
export const isBoolean = isTypeof(`boolean`)
export const isNumber = isTypeof(`number`)
export const isFunction = isTypeof(`function`)
export const isString = isTypeof(`string`)
export const isObject = isTypeof(`object`)
// const delegateFastBinary = curry(𝘍delegateFastBinary)
// const delegateFastTertiary = curry(𝘍delegateFastTertiary)

export const add = curry(𝘍add)
export const alterIndex = curry(𝘍alterIndex)
export const ap = curry(𝘍ap)
export const choice = curry(𝘍choice)
export const difference = curry(𝘍difference)
export const divide = curry(𝘍divide)
export const endsWith = curry(𝘍endsWith)
export const equal = curry(𝘍equals)
export const equals = equal
export const indexOf = curry(𝘍indexOf)
export const iterate = curry(𝘍iterate)
export const lastIndexOf = curry(𝘍lastIndexOf)
export const map = curry(𝘍map)
export const merge = curry(𝘍merge)
export const multiply = curry(𝘍multiply)
export const pairwise = curry(𝘍pairwise)
export const pairwiseObject = curry(𝘍pairwiseObject)
export const pathEq = curry(𝘍pathEq)
export const pathIs = curry(𝘍pathIs)
export const pathOr = curry(𝘍pathOr)
export const path = pathOr(null)
export const pow = curry(𝘍pow)
export const propEq = curry(𝘍propEq)
export const propIs = curry(𝘍propIs)
export const propOr = curry(𝘍propOr)
export const prop = propOr(null)
export const range = curry(𝘍range)
export const reject = curry(𝘍reject)
export const relativeIndex = curry(𝘍relativeIndex)
export const sort = curry(𝘍sort)
export const startsWith = curry(𝘍startsWith)
export const subtract = curry(𝘍subtract)
export const symmetricDifference = curry(𝘍symmetricDifference)
export const ternary = curry(𝘍ternary)
export const triplet = curry(𝘍triplet)

export const chain = curry(function 𝘍chain(fn, functor) {
  return 𝘍delegateFastBinary(`chain`, _flatMap, fn, functor)
})
export const flatMap = chain
export const filter = curry(function 𝘍filter(fn, functor) {
  return 𝘍delegateFastBinary(`filter`, fastFilter, fn, functor)
})

export const reduce = curry(function 𝘍reduce(fn, initial, functor) {
  return 𝘍delegateFastTertiary(`reduce`, fastReduce, fn, initial, functor)
})

export const mapTuples = pairwiseObject(map)
export const mapTuple = mapTuples
const 𝘍mapKeys = (fn, o) => mapTuples(
  ([k, v]) => ([fn(k), v]),
  o
)
export const mapKeys = curry(𝘍mapKeys)

export const flip = (fn) => curry(function 𝘍flip(a, b) {
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

export const which = curry(function 𝘍which(compare, fn, o) {
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
