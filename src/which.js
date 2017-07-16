import fastSome from 'fast.js/array/some'
import fastEvery from 'fast.js/array/every'
import {pipe, curry} from 'katsu-curry'
import {flip} from './flip'
import {triplet} from './triplet'

const {keys} = Object

export const which = curry((compare, fn, o) => {
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
})

/**
 * array.some(fn) but curried and lazy
 * @method some
 * @param {function} predicate
 * @param {Array} iterable
 * @returns {boolean}
 * @public
 */
export const some = which(fastSome)

/**
 * array.every(fn) but curried and lazy
 * @method every
 * @param {function} predicate
 * @param {Array} iterable
 * @returns {boolean}
 * @public
 */
export const every = which(fastEvery)
