import {curry} from 'katsu-curry'
import {e1, e2} from 'entrust'

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
const willDelegate = curry(𝘍willDelegate)

export const 𝘍delegateFastBinary = (method, fast, fn, functor) => {
  return (
    willDelegate(method, functor) ?
      e1(method, fn, functor) :
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

export const 𝘍delegateFastTertiary = (method, fast, fn, initial, functor) => (
  willDelegate(method, functor) ?
    e2(method, fn, initial, functor) :
    fast(functor, fn, initial)
)
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
