import fastFilter from 'fast.js/filter'
import {delegateFastBinary} from './delegate-fast'

/**
 * array.filter(fn) but inverted order, curried and fast
 * @method filter
 * @param {function} predicate
 * @param {Array} iterable
 * @returns {Array} filtered iterable
 * @public
 * @example
 * import {filter} from 'f-utility'
 * filter((x) => x % 2 === 0, [1,2,3,4,5,6,7,8]) // [2,4,6,8]
 */
export const filter = delegateFastBinary(`filter`, fastFilter)
