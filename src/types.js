import {curry} from 'katsu-curry'

/**
 * returns boolean based on type
 * @method isTypeof
 * @param {string} type
 * @param {*} x - anything
 * @returns {boolean} whether x is typeof type
 * @public
 */
export const isTypeof = curry(
  /* istanbul ignore next */
  (type, x) => (type === typeof x)
)

export const isBoolean = isTypeof(`boolean`)
export const isNumber = isTypeof(`number`)
export const isFunction = isTypeof(`function`)
export const isString = isTypeof(`string`)
export const isObject = isTypeof(`object`)
export const isNil = (x) => x == null
export const isArray = Array.isArray
