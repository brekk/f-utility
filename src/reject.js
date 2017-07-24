import {curry} from 'katsu-curry'
import {filter} from './filter'

/**
 * array.filter((x) => !fn(x)) but curried and fast
 * @method reject
 * @param {function} predicate
 * @param {Array} iterable
 * @returns {Array} filtered iterable
 */
export const reject = curry(
  (fn, o) => filter(
    (x) => !fn(x), o
  )
)
