/**
 * Simple wrap for round( x * random )
 * @function random
 * @param {number} x - a number
 * @return {number} x - a rounded and randomized number
 * @public
 * @example
 * import {random} from 'f-utility'
 * random(5) // 1
 * random(5) // 3
 * random(0) // 0
 */
export const random = (x = 1) => Math.round(Math.random() * x)
