import {length as _length} from 'katsu-curry/utils/length'
import * as pkg from '../package.json'

import {random as _random} from './random'
import * as f from './random-floor'
import * as t from './random-take'
import * as w from './random-word'
import * as s from './random-shuffle'

export {
  pipe,
  compose,
  $,
  PLACEHOLDER,
  curryify,
  curry,
  curryObjectK,
  curryObjectN,
  curryObjectKN,
  K,
  I
} from 'katsu-curry'
export {join, sort, symmetricDifference, difference} from './array'
export {choice} from './choice'
export {filter} from './filter'
export {flip} from './flip'
export {fork} from './future'
export {iterate} from './iterate'
export {map} from './map'
export {ap} from './ap'
export {fold} from './either'
export {chain, flatMap} from './chain'
export {equals, equal, round, add, subtract, divide, multiply, pow} from './math'
export {invert, not, not1, not2, not3} from './invert'
export {reduce} from './reduce'
export {reject} from './reject'
export {split, trim} from './string'
export {ternary} from './ternary'
export {triplet} from './triplet'
export {range} from './range'
export {keys, assign, freeze, merge, entries, fromPairs, toPairs} from './object'
export {path, pathOr, prop, propOr, pathEq, pathIs, propIs, propEq} from './path'
export {
  isTypeof,
  isBoolean,
  isNumber,
  isFunction,
  isString,
  isObject,
  isNil,
  isArray,
  isDistinctObject
} from './types'

export const {version} = pkg

export const length = _length
export {
  which,
  some,
  every
} from './which'

export const random = Object.assign(_random, f, t, w, s)
