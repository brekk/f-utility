export * from 'katsu-curry'
export {join} from './array'
export {choice} from './choice'
export {filter} from './filter'
export {flip} from './flip'
export {fork} from './future'
export {iterate} from './iterate'
export {map} from './map'
export {add, subtract, divide, multiply, pow} from './math'
export {reduce} from './reduce'
export {reject} from './reject'
export {split, trim} from './string'
export {ternary} from './ternary'
export {triplet} from './triplet'
export {
  isTypeof,
  isBoolean,
  isNumber,
  isFunction,
  isObject,
  isNil
} from './types'
export {
  which,
  some,
  every
} from './which'

import {random as _random} from './random'
import * as f from './random-floor'
import * as t from './random-take'
import * as w from './random-word'
import * as s from './random-shuffle'

export const random = Object.assign(_random, f, t, w, s)
