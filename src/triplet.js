import {curry} from 'katsu-curry'

/**
 * a ternary statement, but curried and lazy and where each case is a function
 * @method triplet
 * @param {function} cnFn - anything to be evaluated as truthy
 * @param {function} bFn - b function
 * @param {function} aFn - a function
 * @param {mixed} o - input
 * @returns {*} anything
 * @public
 * @example
 * import {triplet} from 'f-utility'
 * const test = (x) => x % 2 === 0
 * const double = (x) => x * 2
 * const half = (x) => x / 2
 * triplet(test, double, half, 100) // 200
 * triplet(test, double, half, 5) // 2.5
 */
export const 𝘍triplet = (cnFn, bFn, aFn, o) => cnFn(o) ? aFn(o) : bFn(o)
export const triplet = curry(𝘍triplet)
