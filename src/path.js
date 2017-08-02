import {curry} from 'katsu-curry'
import {reduce} from './reduce'

/**
 * Grab a nested value from an object or return a default
 * @method pathOr
 * @param {any} def - a default value
 * @param {string[]} lenses - a list of nested properties
 * @param {any} input - an object to grab things from
 * @returns {any} a nested value or default
 * @example
 * import {pathOr} from 'f-utility'
 * pathOr(`default`, [`a`, `b`, `c`], {a: {b: {c: `actual`}}}) // `actual`
 * pathOr(`default`, [`a`, `b`, `c`], {x: {y: {z: `actual`}}}) // `default`
 */
export const pathOr = curry((def, lenses, input) => reduce(
  (focus, lens) => focus[lens] || def,
  input,
  lenses
))

/**
 * Grab a nested value from an object
 * @method path
 * @param {string[]} lenses - a list of nested properties
 * @param {any} input - an object to grab things from
 * @returns {any} a nested value or null
 * @example
 * import {path} from 'f-utility'
 * pathOr([`a`, `b`, `c`], {a: {b: {c: `actual`}}}) // `actual`
 * pathOr([`a`, `b`, `c`], {x: {y: {z: `actual`}}}) // null
 */
export const path = pathOr(null)

/**
 * Grab a property from an object or return a default
 * @method propOr
 * @param {any} def - a default value
 * @param {string} property - a property
 * @param {any} input - an object to grab things from
 * @returns {any} a property or default
 * @example
 * import {propOr} from 'f-utility'
 * pathOr(`default`, `c`, {c: `actual`}) // `actual`
 * pathOr(`default`, `c`, {z: `actual`}) // `default`
 */
export const propOr = curry((def, property, input) => pathOr(def, [property], input))

/**
 * Grab a property from an object or return null
 * @method prop
 * @param {string} property - a property
 * @param {any} input - an object to grab things from
 * @returns {any} a property or null
 * @example
 * import {prop} from 'f-utility'
 * path(`c`, {c: `actual`}) // `actual`
 * path(`c`, {z: `actual`}) // null
 */
export const prop = propOr(null)
