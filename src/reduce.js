import {curry} from 'katsu-curry'
import fastReduce from 'fast.js/reduce'

/**
 * array.reduce but curried and fast
 * @method reduce
 * @param {function} fn - a reducer
 * @param {*} init - an initial value
 * @param {Array} o - iterable
 * @returns {*} mixed reduction
 */
export const reduce = curry((fn, init, o) => fastReduce(o, fn, init))
