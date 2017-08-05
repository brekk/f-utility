import {curry} from 'katsu-curry'

/**
 * === comparison
 * @method equals
 * @param {*} a - anything
 * @param {*} b - anything
 * @returns {boolean} whether a triple-equals b
 * @public
 * @alias equal
 * @example
 * import {equals} from 'f-utility'
 * const SAFE_ID = 123456
 * const equalsID = equals(SAFE_ID)
 * equalsID(200) // false
 * equalsID(SAFE_ID) // true
 */
export const equals = curry((a, b) => a === b)
export const equal = equals

/**
 * convenience method for Math.round
 * @method round
 * @param {number} x - a number
 * @returns {number} rounded number
 * @public
 * @example
 * import {round} from 'f-utility'
 * round(10.3) // 10
 * round(10.9) // 11
 */
export const {round} = Math

/**
 * add things
 * @method add
 * @param {number} a - a number
 * @param {number} b - b number
 * @returns {number} sum
 * @public
 * @example
 * import {add} from 'f-utility'
 * add(4, 2) // 6
 */
export const add = curry((a, b) => b + a)

/**
 * subtract things
 * @method subtract
 * @param {number} a - a number
 * @param {number} b - b number
 * @returns {number} subtracted
 * @public
 * @example
 * import {subtract} from 'f-utility'
 * subtract(4, 2) // -2
 */
export const subtract = curry((a, b) => b - a)

/**
 * multiply things
 * @method multiply
 * @param {number} a - a number
 * @param {number} b - b number
 * @returns {number} multiplied
 * @public
 * @example
 * import {multiply} from 'f-utility'
 * multiply(4, 2) // 8
 */
export const multiply = curry((a, b) => b * a)

/**
 * divide things
 * @method divide
 * @param {number} a - a number
 * @param {number} b - b number
 * @returns {number} divided
 * @public
 * @example
 * import {divide} from 'f-utility'
 * divide(4, 2) // 0.5
 */
export const divide = curry((a, b) => b / a)

/**
 * exponentiate things
 * @method pow
 * @param {number} a - a number
 * @param {number} b - b number
 * @returns {number} b to the power of a
 * @public
 * @example
 * import {pow} from 'f-utility'
 * pow(4, 2) // 16
 */
export const pow = curry((a, b) => Math.pow(b, a))
