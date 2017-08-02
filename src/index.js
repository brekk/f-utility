import {length as _length} from 'katsu-curry/lib/utils/length'
import pkg from '../package.json'
export * from 'katsu-curry'
export {join, sort, symmetricDifference, difference} from './array'
export {choice} from './choice'
export {filter} from './filter'
export {flip} from './flip'
export {fork} from './future'
export {iterate} from './iterate'
export {map} from './map'
export {round, add, subtract, divide, multiply, pow} from './math'
export {reduce} from './reduce'
export {reject} from './reject'
export {split, trim} from './string'
export {ternary} from './ternary'
export {triplet} from './triplet'
export {path, pathOr, prop, propOr} from './path'
export {
  isTypeof,
  isBoolean,
  isNumber,
  isFunction,
  isString,
  isObject,
  isNil,
  isArray
} from './types'

export const {version} = pkg

const {keys: _keys, freeze: _freeze, assign: _assign} = Object
export const keys = _keys
export const freeze = _freeze
export const assign = _assign

export const length = _length
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
