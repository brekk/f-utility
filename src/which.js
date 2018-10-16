import fastSome from 'fast.js/array/some'
import fastEvery from 'fast.js/array/every'
import {pipe, curry} from 'katsu-curry'
import {flip} from './flip'
import {triplet} from './triplet'

const {keys} = Object

export const __which = (compare, fn, o) => {
  // allows us to pass functions to compare first
  const arecomp = flip(compare)
  return triplet(
    Array.isArray,
    arecomp(fn),
    pipe(
      keys,
      arecomp((key) => fn(o[key], key))
    ),
    o
  )
}
export const which = curry(__which)

/**
 * array.some(fn) but curried and lazy
 * @method some
 * @param {function} predicate
 * @param {Array} iterable
 * @returns {boolean}
 * @public
 * @example
 * import {some} from 'f-utility'
 * some((x) => x === `j`, [`j`, `k`, `l`]) // true
 * some((x) => x === `z`, [`j`, `k`, `l`]) // false
 */
export const some = which(fastSome)

/**
 * array.every(fn) but curried and lazy
 * @method every
 * @param {function} predicate
 * @param {Array} iterable
 * @returns {boolean}
 * @public
 * @example
 * import {isNumber, every} from 'f-utility'
 * every(isNumber, [0, 1, 2, 3, 4]) // true
 * every(isNumber, [0, 1, 2, 3, `four`]) // false
 */
export const every = which(fastEvery)
