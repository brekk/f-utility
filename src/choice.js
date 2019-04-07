import { curry } from "katsu-curry"

/**
 * takes a function that takes two parameters and returns a ternary result
 * @method choice
 * @param {function} cnFn - ternary
 * @param {*} b - anything
 * @param {*} a - anything
 * @returns {*} result
 * @public
 * @example
 * import {choice} from 'f-utility'
 * const max = choice((a, b) => a > b)
 * max(500, 20) // 500
 * max(20, 500) // 500
 */
export const __choice = (cnFn, b, a) => (cnFn(a, b) ? a : b)
export const choice = curry(__choice)
