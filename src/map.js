import fastMap from 'fast.js/map'
import {curry} from 'katsu-curry'
import FL from 'fantasy-land'
import {e1} from 'entrust'

const has = curry((x, y) => !!y[x])
const hasMap = has(`map`)
const hasFLMap = has(FL.map)
const _map = e1(`map`)
const flMap = e1(FL.map)

/**
 * functor.map(fn) but curried and fast (though will delegate to the functor)
 * @method map
 * @param {function} fn
 * @param {Array} functor
 * @returns {Array} mapped iterable
 * @public
 */
export const map = curry(
  (fn, functor) => {
    // if it's an array we wanna pass to fastMap
    if (hasMap(functor) && !Array.isArray(functor)) return _map(fn, functor)
    if (hasFLMap(functor)) return flMap(fn, functor)
    return fastMap(functor, fn)
  }
)
