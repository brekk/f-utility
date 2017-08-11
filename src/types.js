import {curry} from 'katsu-curry'

/**
 * returns boolean based on type
 * @method isTypeof
 * @param {string} type
 * @param {*} x - anything
 * @returns {boolean} whether x is typeof type
 * @public
 * @example
 * import {isTypeof} from 'f-utility'
 * isTypeof(`boolean`, true) // true
 * isTypeof(`boolean`, `nope`) // false
 */
export const isTypeof = curry(
  /* istanbul ignore next */
  (type, x) => (type === typeof x) // eslint-disable-line valid-typeof
)

/**
 * test whether something is a boolean
 * @method isBoolean
 * @param {*} x - anything
 * @returns {boolean} - true if the input is a boolean
 * @public
 * @example
 * import {isBoolean} from 'f-utility'
 * isBoolean(true) // true
 * isBoolean(1) // false
 * isBoolean(`a`) // false
 * isBoolean([`a`]) // false
 */
export const isBoolean = isTypeof(`boolean`)

/**
 * test whether something is a number
 * @method isNumber
 * @param {*} x - anything
 * @returns {boolean} - true if the input is a number
 * @public
 * @example
 * import {isNumber} from 'f-utility'
 * isNumber(true) // false
 * isNumber(1) // true
 * isNumber(`a`) // false
 * isNumber([`a`]) // false
 */
export const isNumber = isTypeof(`number`)

/**
 * test whether something is a function
 * @method isFunction
 * @param {*} x - anything
 * @returns {boolean} - true if the input is a function
 * @public
 * @example
 * import {isFunction} from 'f-utility'
 * isFunction(true) // false
 * isFunction(1) // false
 * isFunction(`a`) // false
 * isFunction([`a`]) // false
 * isFunction(() => {}) // true
 */
export const isFunction = isTypeof(`function`)

/**
 * test whether something is a string
 * @method isString
 * @param {*} x - anything
 * @returns {boolean} - true if the input is a string
 * @public
 * @example
 * import {isString} from 'f-utility'
 * isString(true) // false
 * isString(1) // false
 * isString(`a`) // true
 * isString([`a`]) // false
 * isString(() => {}) // false
 */
export const isString = isTypeof(`string`)

/**
 * test whether something is null-ish
 * @method isNil
 * @param {*} x - anything
 * @returns {boolean} - true if the input is null-ish
 * @public
 * @example
 * import {isNil} from 'f-utility'
 * isNil(true) // false
 * isNil(1) // false
 * isNil(`a`) // false
 * isNil([`a`]) // false
 * isNil({}) // false
 * isNil(null) // true
 * isNil(undefined) // true
 */
export const isNil = (x) => x == null

/**
 * test whether something is an object
 * @method isObject
 * @param {*} x - anything
 * @returns {boolean} - true if the input is a object
 * @public
 * @example
 * import {isObject} from 'f-utility'
 * isObject(true) // false
 * isObject(1) // false
 * isObject(`a`) // false
 * isObject([`a`]) // true
 * isObject({}) // true
 * isObject(null) // true
 */
export const isObject = isTypeof(`object`)

/**
 * test whether something is an array
 * @method isArray
 * @param {*} x - anything
 * @returns {boolean} - true if the input is an array
 * @public
 * @example
 * import {isArray} from 'f-utility'
 * isArray(true) // false
 * isArray(1) // false
 * isArray(`a`) // false
 * isArray([`a`]) // true
 * isArray({}) // false
 * isArray(null) // false
 * isArray(undefined) // false
 */
export const isArray = Array.isArray

/**
 * test whether something is a non-null object which isn't an array
 * @method isDistinctObject
 * @param {*} x - anything
 * @returns {boolean} - true if the input is an object that isn't an array and isn't null
 * @public
 * @example
 * import {isDistinctObject} from 'f-utility'
 * isDistinctObject(true) // false
 * isDistinctObject(1) // false
 * isDistinctObject(`a`) // false
 * isDistinctObject([`a`]) // false
 * isDistinctObject({}) // true
 * isDistinctObject(null) // false
 * isDistinctObject(undefined) // false
 */
export const isDistinctObject = (x) => !isNil(x) && isObject(x) && !isArray(x)
