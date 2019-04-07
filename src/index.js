import * as pkg from "../package.json"

import { random as _random } from "./random"
import * as f from "./random-floor"
import * as t from "./random-take"
import * as w from "./random-word"
import * as s from "./random-shuffle"

export {
  pipe,
  $,
  PLACEHOLDER,
  curryify,
  curry,
  curryObjectK,
  curryObjectN,
  curryObjectKN,
  remap,
  remapArray,
  K,
  I
} from "katsu-curry"
const innerpipe = args => x => {
  const [first, ...rest] = args
  let current = first(x)
  for (let a = 0; a < rest.length; a++) {
    current = rest[a](current)
  }
  return current
}
export function compose() {
  const length = arguments.length
  const args = new Array(length)
  for (let i = length - 1; i > -1; --i) {
    args[i] = arguments[i]
  }
  return innerpipe(args.reverse())
}
export {
  concat,
  join,
  sort,
  symmetricDifference,
  difference,
  alterIndex,
  alterFirstIndex,
  alterLastIndex,
  relativeIndex
} from "./array"
export { choice } from "./choice"
export { filter } from "./filter"
export { flip } from "./flip"
export { fork } from "./future"
export { iterate } from "./iterate"
export { map } from "./map"
export { ap } from "./ap"
export { fold } from "./either"
export { chain, flatMap } from "./chain"
export {
  equals,
  equal,
  round,
  add,
  subtract,
  divide,
  multiply,
  pow
} from "./math"
export { invert, not } from "./invert"
export { reduce } from "./reduce"
export { reject } from "./reject"
export {
  charAt,
  codePointAt,
  endsWith,
  indexOf,
  lastIndexOf,
  match,
  padEnd,
  padStart,
  repeat,
  replace,
  search,
  split,
  startsWith,
  substr,
  trim
} from "./string"
export { ternary } from "./ternary"
export { triplet } from "./triplet"
export { range } from "./range"
export {
  keys,
  assign,
  freeze,
  merge,
  entries,
  fromPairs,
  toPairs,
  mapTuple,
  mapTuples,
  mapKeys,
  pairwise,
  pairwiseObject
} from "./object"
export {
  path,
  pathOr,
  pathEq,
  pathSatisfies,
  prop,
  propOr,
  propIs,
  propEq,
  propSatisfies
} from "./path"
export {
  isTypeof,
  isBoolean,
  isNumber,
  isFunction,
  isString,
  isObject,
  isNil,
  isArray,
  isDistinctObject,
  isPOJO
} from "./types"

export const { version } = pkg

export { length, objectLength, anyLength } from "./length"
export { which, some, every } from "./which"

export const random = Object.assign(_random, f, t, w, s)
