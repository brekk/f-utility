import { curry } from "katsu-curry"

/**
 * Simple wrap for floor( x * random )
 * @function random.floor
 * @param {number} x - a number
 * @return {number} x - a rounded number
 * @public
 * @example
 * import {random} from 'f-utility'
 * const {floor} = random
 * floor(0) // 0
 */
export const floor = x => Math.floor(Math.random() * x)

/**
 * Simple wrap for floor( x * random ) + min
 * @function random.floorMin
 * @param {number} min - a number to be the minimum
 * @param {number} x - a number to be randomly rounded
 * @return {number} a number that is randomly above the min
 * @public
 * @example
 * import {random} from 'f-utility'
 * const {floorMin} = random
 * floor(0, 0) // 0
 */
export const floorMin = curry((min, x) => floor(x) + min)
