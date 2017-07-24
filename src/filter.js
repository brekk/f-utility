import fastFilter from 'fast.js/filter'
import {delegateFastBinary} from './delegate-fast'

/**
 * array.filter(fn) but curried and fast
 * @method filter
 * @param {function} predicate
 * @param {Array} iterable
 * @returns {Array} filtered iterable
 * @public
 */
export const filter = delegateFastBinary(`filter`, fastFilter)
