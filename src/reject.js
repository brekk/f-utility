import {curry} from 'katsu-curry'
import fastFilter from 'fast.js/filter'

/**
 * array.filter((x) => !fn(x)) but curried and fast
 * @method reject
 * @param {function} predicate
 * @param {array} iterable
 * @returns {array} filtered iterable
 */
export const reject = curry((fn, o) => fastFilter(o, (x) => !fn(x)))
