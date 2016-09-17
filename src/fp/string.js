import curry from "lodash/fp/curry"
import map from "lodash/fp/map"

/**
 * @namespace util.string
 * @function trim
 * @param {string} x - a string
 * @return {string} a string
 */
export const trim = (x) => x.trim()

/**
 * @namespace util.string
 * @function trimmer
 * @param {Array.string} array
 * @return {Array.string} array
 */
export const trimmer = map(trim)

/**
 * @namespace util.string
 * @function split
 * @curried
 * @param {string} delim - a delimiter to split upon
 * @param {string} str - a string
 * @return {array}
 */
export const split = curry(function _split(delim, str) {
  return str.split(delim)
})
