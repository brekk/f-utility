import {curry, pipe} from 'f-utility'

/**
 * @method invert
 * @param {*} x - any
 * @returns {boolean} !x
 * @public
 * @example
 * import {pipe, invert} from 'f-utility'
 * const isOdd = pipe(
 *   (x) => x % 2 === 0,
 *   invert
 * )
 */
export const invert = (x) => !x

/**
 * return the result of inverting a nullary function
 * @method not
 * @param {function} fn - a function to invert the result of
 * @returns {*} mixed
 * @public
 * @example
 * import {not, equal} from 'f-utility'
 * const ID = 12345
 * const isntID = not(equal(ID))
 * isntID(ID) // false
 * isntID(123) // true
 */
export const not = (fn) => pipe(
  fn,
  invert
)

/**
 * return the result of inverting a unary function
 * @method not1
 * @param {function} fn - a function to invert the result of
 * @param {*} a - a parameter to pass to the function
 * @returns {*} mixed
 * @public
 * @example
 * import {not, equal} from 'f-utility'
 * const ID = 12345
 * const isntID = not2(equal, ID)
 * isntID(ID) // false
 * isntID(123) // true
 */
export const not1 = curry((fn, a) => pipe(
  fn(a),
  invert
))

/**
 * return the result of inverting a binary function
 * @method not2
 * @param {function} fn - a function to invert the result of
 * @param {*} a - a parameter to pass to the function
 * @param {*} b - a parameter to pass to the function
 * @returns {*} mixed
 * @public
 */
export const not2 = curry((fn, a, b) => pipe(
  fn(a, b),
  invert
))

/**
 * return the result of inverting a tertiary function
 * @method not3
 * @param {function} fn - a function to invert the result of
 * @param {*} a - a parameter to pass to the function
 * @param {*} b - a parameter to pass to the function
 * @param {*} c - a parameter to pass to the function
 * @returns {*} mixed
 * @public
 */
export const not3 = curry((fn, a, b, c) => pipe(
  fn(a, b, c),
  invert
))
