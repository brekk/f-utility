import fastReduce from 'fast.js/reduce'
import {delegateFastTertiary} from './delegate-fast'

/**
 * functor.reduce but curried and fast
 * @method reduce
 * @param {function} fn - a reducer
 * @param {*} init - an initial value
 * @param {Array|Monad} o - iterable
 * @returns {*} mixed reduction
 * @public
 * @example
 * import {reduce} from 'f-utility'
 * const sum = reduce((agg, x) => agg + x, 0)
 * sum([1, 2, 3, 4, 5]) // 15
 */

export const reduce = delegateFastTertiary(`reduce`, fastReduce)
