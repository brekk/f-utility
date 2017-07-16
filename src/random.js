/**
 * Simple wrap for round( x * random )
 * @function random
 * @param {number} x - a number
 * @return {number} x - a rounded and randomized number
 * @public
 */
export const random = (x = 1) => Math.round(Math.random() * x)
