import {curry} from 'katsu-curry'

export const equals = curry((a, b) => a === b)

/**
 * convenience method for Math.round
 * @method round
 * @param {number} x - a number
 * @returns {number} rounded number
 * @private
 */
export const {round} = Math

/**
 * add things
 * @method add
 * @param {number} a - a number
 * @param {number} b - b number
 * @returns {number} sum
 * @private
 */
export const add = curry((a, b) => b + a)

/**
 * subtract things
 * @method subtract
 * @param {number} a - a number
 * @param {number} b - b number
 * @returns {number} subtracted
 * @private
 */
export const subtract = curry((a, b) => b - a)

/**
 * multiply things
 * @method multiply
 * @param {number} a - a number
 * @param {number} b - b number
 * @returns {number} multiplied
 * @private
 */
export const multiply = curry((a, b) => b * a)

/**
 * divide things
 * @method divide
 * @param {number} a - a number
 * @param {number} b - b number
 * @returns {number} divided
 * @private
 */
export const divide = curry((a, b) => b / a)

/**
 * exponentiate things
 * @method pow
 * @param {number} a - a number
 * @param {number} b - b number
 * @returns {number} b to the power of a
 * @private
 */
export const pow = curry((a, b) => Math.pow(b, a))
