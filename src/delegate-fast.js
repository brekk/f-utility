import {curry} from 'katsu-curry'
import {e1, e2} from 'entrust'

const has = curry((x, y) => !!y[x])
const {isArray} = Array

const willDelegate = curry(
  (method, functor) => (
    has(method, functor) && !isArray(functor)
  )
)

/**
 * functor last curried goodness
 * @method delegateFastBinary
 * @param {function} fn
 * @param {Array} functor
 * @returns {Array} mapped iterable
 * @protected
 */
export const delegateFastBinary = curry(
  (method, fast, fn, functor) => {
    return (
      willDelegate(method, functor) ?
      e1(method, fn, functor) :
      fast(functor, fn)
    )
  }
)

/**
 * functor last curried goodness
 * @method delegateFastTertiary
 * @param {function} fn
 * @param {*} initial
 * @param {Array} functor
 * @returns {Array} mapped iterable
 * @protected
 */
export const delegateFastTertiary = curry(
  (method, fast, fn, initial, functor) => (
    willDelegate(method, functor) ?
    e2(method, fn, initial, functor) :
    fast(functor, fn, initial)
  )
)
