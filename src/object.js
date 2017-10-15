import {curry, pipe} from 'katsu-curry'
import {reduce} from './reduce'
import {map} from './map'
// import {alterFirstIndex, alterLastIndex} from './array'
const {keys: _keys, freeze: _freeze, assign: _assign} = Object

/**
 * Object.keys
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
 * @method keys
 * @param {Object} a - an object
 * @returns {Array} - an array of keys
 * @public
 * @example
 * import {keys} from 'f-utility'
 * keys({a: 1, b: 2}) // [`a`, `b`]
 */
export const keys = _keys

/**
 * @method values
 * @param {Object} x - input
 * @returns {Strings[]} values - an array of properties
 * @public
 * @example
 * import {values} from 'f-utility'
 * values({a:1, b: 2, c: 3}) // [1, 2, 3]
 */
export const values = (x) => keys(x).map((y) => x[y])

/**
 * Object.freeze
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * @method freeze
 * @param {Object} a - an object
 * @returns {Object} - a frozen object
 * @public
 * @example
 * import {freeze} from 'f-utility'
 * const immutable = freeze({a: 1, b: 2})
 * immutable.a = 5 // throws error
 */
export const freeze = _freeze

/**
 * Object.assign
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 * @method assign
 * @param {Object} a - any number of objects
 * @returns {Object} - a merged object
 * @public
 * @example
 * import {assign} from 'f-utility'
 * assign({c: 3}, {a: 1, b: 2}) // {a: 1, b: 2, c: 3}
 */
export const assign = _assign

/**
 * object.assign but enforced as a binary function
 * @method merge
 * @param {Object} a - object a
 * @param {Object} b - object b
 * @returns {Object} c - the results of merging a and b
 * @public
 * @example
 * import {merge} from 'f-utility'
 * merge({c: 3}, {a: 1, b: 2}) // {a: 1, b: 2, c: 3}
 */
export const merge = curry((a, b) => assign({}, a, b))

/**
 * Object.entries shim
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
 * @method entries
 * @param {Object} o - an object
 * @returns {Array} - an array of tuples [key, value] pairs
 * @public
 * @example
 * import {entries} from 'f-utility'
 * entries({a: 1, b: 2}) // [[`a`, 1], [`b`, 2]]
 */
export const entries = (o) => pipe(
  keys,
  map((k) => ([k, o[k]]))
)(o)

/**
 * An alias of `entries`
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
 * @method toPairs
 * @param {Object} o - an object
 * @returns {Array} - an array of tuples [key, value] pairs
 * @public
 * @example
 * import {toPairs} from 'f-utility'
 * toPairs({a: 1, b: 2}) // [[`a`, 1], [`b`, 2]]
 */
export const toPairs = entries

/**
 * convert a list of key value pairs into an object
 * @method fromPairs
 * @param {Array} - a list of [key, value] pairs
 * @returns {Object} merged results
 * @public
 * @example
 * import {fromPairs} from 'f-utility'
 * fromPairs([[`a`, 1], [`b`, 2]]) // {a: 1, b: 2}
 */
export const fromPairs = reduce(
  (agg, [k, v]) => merge(agg, {[k]: v}),
  {}
)

/**
 * a simple object tuple-mapper
 * @method mapTuple - a function which maps over key, value tuples
 * @param {Object} o - object
 * @returns {Object} a mapped object
 * @public
 * @example
 * import {mapTuple} from 'f-utility'
 * const input = {
 *   a: 1,
 *   b: 2,
 *   c: 3
 * }
 * const fn = ([k, v]) => ([k.toUpperCase(), v * 2])
 * mapTuple(fn, input) // {A: 2, B: 4, C: 6}
 */
export const mapTuple = curry((fn, o) => pipe(
  toPairs,
  map(fn),
  fromPairs
)(o))

/**
 * a simple object tuple-mapper
 * @method mapValues - a function which maps over values only
 * @param {Object} o - object
 * @returns {Object} a mapped object
 * @public
 * @example
 * import {mapValues} from 'f-utility'
 * const input = {
 *   a: 1,
 *   b: 2,
 *   c: 3
 * }
 * const fn = (v) => (v * 2)
 * mapValues(fn, input) // {a: 2, b: 4, c: 6}
 */
export const mapValues = curry((fn, o) => mapTuple(
  ([k, v]) => ([k, fn(v)]),
  o
))

/**
 * a simple object tuple-mapper
 * @method mapKeys - a function which maps over values only
 * @param {Object} o - object
 * @returns {Object} a mapped object
 * @public
 * @example
 * import {mapKeys} from 'f-utility'
 * const input = {
 *   a: 1,
 *   b: 2,
 *   c: 3
 * }
 * const fn = (v) => `__${v}`
 * mapKeys(fn, input) // {__a: 1, __b: 2, __c: 3}
 */
export const mapKeys = curry((fn, o) => mapTuple(
  ([k, v]) => ([fn(k), v]),
  o
))
