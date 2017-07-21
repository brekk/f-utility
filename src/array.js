import {e1} from 'entrust'
import {curry} from 'katsu-curry'

/**
 * string.prototype.join but curried
 * @method join
 * @param {string} delimiter
 * @param {Array} list
 * @returns {string} joined
 * @public
 */
export const join = e1(`join`)

/**
 * string.prototype.sort but curried
 * @method sort
 * @param {function} fn
 * @param {Array} functor
 * @returns {string} sorted
 * @public
 */
// we can't just invert things with entrust, as sort is a mutating method
// export const sort = e1(`sort`)

export const sort = curry((fn, functor) => {
  const copy = Array.from(functor)
  copy.sort(fn)
  return copy
})
