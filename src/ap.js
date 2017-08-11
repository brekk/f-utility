import {curry} from 'katsu-curry'
import {isFunction} from './types'
import {reduce} from './reduce'
import {map} from './map'

/**
 * Apply a list of functions to a list of values
 * @method ap
 * @param {function|functions[]} applicative - a single function or array of applicatives
 * @param {Array} functor - an array of values
 * @returns {Array} a concatenated list of all applicatives applied to all values
 * @public
 * @example
 * import {ap} from 'f-utility'
 * ap([
 *   (x) => x.toUppercase(),
 *   (x) => `${x} batteries`
 *  ],
 *  `abc`.split(``)
 * ) // [`A`, `B`, `C`, `a batteries`, `b batteries`, `c batteries`]
 */
export const ap = curry((applicative, functor) => {
  if (functor && functor.ap && isFunction(functor.ap)) return functor.ap(applicative)
  if (isFunction(functor)) return (x) => (applicative(x)(functor(x)))
  return reduce((agg, f) => agg.concat(map(f, functor)), [], applicative)
})
