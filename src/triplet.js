import {curry} from 'katsu-curry'

/**
 * a ternary statement, but curried and lazy and where each case is a function
 * @method triplet
 * @param {function} cnFn - anything to be evaluated as truthy
 * @param {function} aFn - a function
 * @param {function} bFn - b function
 * @param {mixed} o - input
 * @returns {*} anything
 */
export const triplet = curry((cnFn, bFn, aFn, o) => cnFn(o) ? aFn(o) : bFn(o))
