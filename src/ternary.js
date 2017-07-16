import {curry} from 'katsu-curry'

/**
 * a ternary statement, but curried and lazy
 * @method ternary
 * @param {*} cn - anything to be evaluated as truthy
 * @param {*} a - anything
 * @param {*} b - anything
 * @returns {mixed} a / b
 */
export const ternary = curry((cn, b, a) => cn ? a : b)
