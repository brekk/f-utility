import {curry} from 'katsu-curry'

const has = (x, y) => !!y[x]
const {isArray} = Array

export const 𝘍willDelegate = (method, functor) => (
  has(method, functor) && !isArray(functor)
)
/**
 * functor-last curried goodness
 * @method willDelegate
 * @param {string} method
 * @param {*} functor
 * @returns {boolean} should we delegate?
 * @private
 */
// const willDelegate = curry(𝘍willDelegate)

export function 𝘍delegateFastBinary(method, fast, fn, functor) {
  return (
    𝘍willDelegate(method, functor) ?
      functor[method](fn) :
      fast(functor, fn)
  )
}
/**
 * functor-last curried goodness
 * @method delegateFastBinary
 * @param {function} fn
 * @param {Array} functor
 * @returns {Array} mapped iterable
 * @private
 */
export const delegateFastBinary = curry(
  𝘍delegateFastBinary
)

export function 𝘍delegateFastTertiary(method, fast, fn, initial, functor) {
  return (
    𝘍willDelegate(method, functor) ?
      functor[method](fn, initial) :
      fast(functor, fn, initial)
  )
}
/**
 * functor-last curried goodness
 * @method delegateFastTertiary
 * @param {function} fn
 * @param {*} initial
 * @param {Array} functor
 * @returns {Array} mapped iterable
 * @private
 */
export const delegateFastTertiary = curry(
  𝘍delegateFastTertiary
)
