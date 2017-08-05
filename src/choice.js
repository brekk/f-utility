import {curry} from 'katsu-curry'

/**
 * takes a function that takes two parameters and returns a ternary result
 * @method choice
 * @param {function} cnFn
 * @param {*} a - anything
 * @param {*} b - anything
 * @returns {*} result
 * @public
 * import {choice} from 'f-utility'
 * const max = choice((a, b) => a > b)
 * max(500, 20) // 500
 * max(20, 500) // 500
 */
export const choice = curry((cnFn, b, a) => cnFn(a, b) ? a : b)
