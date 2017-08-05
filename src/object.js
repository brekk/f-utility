import {curry} from 'katsu-curry'
const {keys: _keys, freeze: _freeze, assign: _assign} = Object

/**
 * Object.keys
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
 * @method keys
 * @param {Object} a - an object
 * @returns {Array} - an array of keys
 * @public
 */
export const keys = _keys

/**
 * Object.freeze
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * @method freeze
 * @param {Object} a - an object
 * @returns {Object} - a frozen object
 * @public
 */
export const freeze = _freeze

/**
 * Object.assign
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 * @method assign
 * @param {Object} a - any number of objects
 * @returns {Object} - a merged object
 * @public
 */
export const assign = _assign

/**
 * object.assign but enforced as a binary function
 * @method merge
 * @param {Object} a - object a
 * @param {Object} b - object b
 * @returns {Object} c - the results of merging a and b
 * @public
 */
export const merge = curry((a, b) => assign({}, a, b))
