import {curry} from 'katsu-curry'

/**
 * a ternary statement, but curried and lazy
 * @method ternary
 * @param {*} cn - anything to be evaluated as truthy
 * @param {*} b - anything
 * @param {*} a - anything
 * @returns {mixed} a / b
 * @example
 * import {ternary} from `f-utility`
 * ternary(true, `a`, `b`) // `a`
 * ternary(false, `a`, `b`) // `b`
 */
export const __ternary = (cn, b, a) => cn ? a : b
export const ternary = curry(__ternary)
