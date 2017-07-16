import {curry} from 'katsu-curry'

/**
 * Simple wrap for floor( x * random )
 * @function floor
 * @param {number} x - a number
 * @return {number} x - a rounded number
 * @public
 */
export const floor = (x) => Math.floor(Math.random() * x)

/**
 * Simple wrap for floor( x * random ) + min
 * @function floorMin
 * @curried
 * @param {number} min - a number to be the minimum
 * @param {number} x - a number to be randomly rounded
 * @return {number} a number that is randomly above the min
 * @public
 */
export const floorMin = curry((min, x) => floor(x) + min)
