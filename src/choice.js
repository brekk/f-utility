import {curry} from 'katsu-curry'

/**
 * takes a function that takes two parameters and returns a ternary result
 * @method choice
 * @param {function} cnFn
 * @param {*} a - anything
 * @param {*} b - anything
 * @returns {*} result
 * @public
 */
export const choice = curry((cnFn, b, a) => cnFn(a, b) ? a : b)
