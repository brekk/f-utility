/**
 * @method not
 * @param {*} x - any
 * @returns {boolean} !x
 * @public
 * @example
 * import {pipe, not} from 'f-utility'
 * const isOdd = pipe(
 *   (x) => x % 2 === 0,
 *   not
 * )
 */
export const not = x => !x

export const invert = x =>
  Object.keys(x).reduce((o, key) => {
    const value = x[key]
    o[value] = o[value] ? o[value].concat(key) : [key]
    return o
  }, {})
