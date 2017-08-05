import {curry} from 'katsu-curry'

/**
 * take a function, flip the two parameters being passed to it, curry it
 * @method flip
 * @param {function} fn - a function
 * @returns {*} the result of invoking function with two inverted parameters
 * @public
 * @example
 * import {flip} from 'f-utility'
 * const divide = (a, b) => a / b
 * const ivideday = flip(divide)
 * divide(1, 5) // 0.2
 * ivideday(1, 5) // 5
 */
export const flip = (fn) => curry((a, b) => fn(b, a))
