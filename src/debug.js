import _flatMap from 'flatmap-fast'
import fastReduce from 'fast.js/reduce'
import fastFilter from 'fast.js/filter'
import fastSome from 'fast.js/array/some'
import fastEvery from 'fast.js/array/every'
import {custom} from 'entrust'
import * as KATSU_DEBUG from 'katsu-curry/debug'

import {𝘍ap} from './ap'
import {𝘍isTypeof} from './types'
import {𝘍which} from './which'
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
  𝘍mapKeys
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
  𝘍pow
} from './math'
import {
  𝘍pathOr,
  𝘍propOr,
  𝘍pathEq,
  𝘍pathIs,
  𝘍propIs,
  𝘍propEq
} from './path'

export const {curry, pipe} = KATSU_DEBUG

export const {
  compose,
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
  entries,
  fromPairs,
  toPairs,
  mapTuple,
  mapTuples
} from './object'
export {
  isNil,
  isArray,
  isDistinctObject,
  isPOJO
} from './types'

export {
  round
} from './math'

const entrust = custom(curry)

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

export const endsWithLength = e2(`endsWith`)
export const indexOfFromIndex = e2(`indexOf`)
export const lastIndexOfFromIndex = e2(`lastIndexOf`)
export const padEnd = e2(`padEnd`)
export const padStart = e2(`padStart`)
export const replace = e2(`replace`)
export const startsWithFromPosition = e2(`startsWith`)
export const substr = e2(`substr`)

export const isTypeof = curry(𝘍isTypeof)
export const isBoolean = isTypeof(`boolean`)
export const isNumber = isTypeof(`number`)
export const isFunction = isTypeof(`function`)
export const isString = isTypeof(`string`)
export const isObject = isTypeof(`object`)

const delegateFastBinary = curry(𝘍delegateFastBinary)
const delegateFastTertiary = curry(𝘍delegateFastTertiary)

export const reduce = delegateFastTertiary(`reduce`, fastReduce)

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
export const mapKeys = curry(𝘍mapKeys)
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

export const chain = delegateFastBinary(`chain`, _flatMap)
export const flatMap = chain
export const filter = delegateFastBinary(`filter`, fastFilter)

export const flip = (fn) => curry((a, b) => fn(b, a))

export const alterLastIndex = alterIndex(-1)
export const alterFirstIndex = alterIndex(0)
export const invert = _invert
export const not = (fn) => pipe(
  fn,
  invert
)
export const not1 = curry((fn, a) => pipe(
  fn(a),
  invert
))
export const not2 = curry((fn, a, b) => pipe(
  fn(a, b),
  invert
))
export const not3 = curry((fn, a, b, c) => pipe(
  fn(a, b, c),
  invert
))

export const propLength = prop(`length`)
export const objectLength = pipe(Object.keys, propLength)
export const length = (x) => (typeof x === `object` ? objectLength(x) : propLength(x))

export const which = curry(𝘍which)
export const some = which(fastSome)
export const every = which(fastEvery)
