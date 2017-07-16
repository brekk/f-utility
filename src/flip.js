import {curry} from 'katsu-curry'

/**
 * flip two parameters being passed to a function
 * @method flip
 * @param {function} fn - a function
 * @returns {*} the result of invoking function with two inverted parameters
 * @public
 */
export const flip = (fn) => curry((a, b) => fn(b, a))
