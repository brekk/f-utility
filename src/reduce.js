import fastReduce from 'fast.js/reduce'
import {delegateFastTertiary} from './delegate-fast'

/**
 * array.reduce but curried and fast
 * @method reduce
 * @param {function} fn - a reducer
 * @param {*} init - an initial value
 * @param {Array} o - iterable
 * @returns {*} mixed reduction
 */

export const reduce = delegateFastTertiary(`reduce`, fastReduce)
