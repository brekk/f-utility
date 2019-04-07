import { pipe } from "katsu-curry"
import { prop } from "./path"
import { keys } from "./object"

/**
 * returns .length if it exists on an input
 * @method propLength
 * @param {*} whatever - some input
 * @returns {number} length
 * @private
 */
export const propLength = prop(`length`)

/**
 * returns total keys in an object
 * @method objectLength
 * @param {Object} object - an object
 * @returns {number} length
 * @private
 */
export const objectLength = pipe(
  keys,
  propLength
)

export const length = propLength
export const anyLength = x =>
  typeof x === `object` ? objectLength(x) : propLength(x)
