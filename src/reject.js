import {curry} from 'katsu-curry'
import {filter} from './filter'

/**
 * array.filter((x) => !fn(x)) but inverted order, curried and fast
 * @method reject
 * @param {function} predicate
 * @param {Array} iterable
 * @returns {Array} filtered iterable
 * @public
 * @example
 * import {reject} from 'f-utility'
 * reject((x) => x % 2 !== 0, [1,2,3,4,5,6,7,8]) // [2,4,6,8]
 */
export const reject = curry(
  (fn, o) => filter(
    (x) => !fn(x), o
  )
)
