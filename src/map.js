import fastMap from 'fast.js/map'
import {curry} from 'katsu-curry'
// import FL from 'fantasy-land'

/**
 * functor.map(fn) but curried and fast (though will delegate to the functor)
 * @method map
 * @param {function} fn
 * @param {Array} functor
 * @returns {Array} mapped iterable
 * @public
 * @example
 * import {map} from 'f-utility'
 * const add1 = map((x) => x + 1)
 * add1([1,2,3]) // [2,3,4]
 */
export const map = curry(
  (fn, functor) => {
    if (functor && functor.map && !Array.isArray(functor)) return functor.map(fn)
    // if (functor && functor[FL.map]) return functor[FL.map](fn)
    return fastMap(functor, fn)
  }
)
