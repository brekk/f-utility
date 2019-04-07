import { pipe, curry } from "katsu-curry"
import { reduce } from "./reduce"
import { equals } from "./math"

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
export const __pathOr = (def, lenses, input) =>
  reduce((focus, lens) => focus[lens] || def, input, lenses)
export const pathOr = curry(__pathOr)

/**
 * Grab a property from an object and compare it with a given function
 * @method pathSatisfies
 * @param {function} equiv - a test function
 * @param {string} pathTo - a nested property
 * @param {any} input - an object to grab things from
 * @returns {boolean} a truthy value
 */
export const __pathSatisfies = (equiv, pathTo, input) =>
  pipe(
    path(pathTo),
    equiv,
    Boolean
  )(input)
export const pathSatisfies = curry(__pathSatisfies)

/**
 * Grab a property from an object and compare it with a given function
 * @method propSatisfies
 * @param {function} equiv - a test function
 * @param {string} propTo - a nested property
 * @param {any} input - an object to grab things from
 * @returns {boolean} a truthy value
 */
export const __propSatisfies = (equiv, propTo, input) =>
  pipe(
    prop(propTo),
    equiv,
    Boolean
  )(input)
export const propSatisfies = curry(__propSatisfies)

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
export const __propOr = (def, property, input) => pathOr(def, [property], input)
export const propOr = curry(__propOr)

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

/**
 * Grab a property from an object and compare it with a given value via ===
 * @method pathEq
 * @param {strings[]} lenses - a property
 * @param {any} equiv - equivalent value
 * @param {any} input - an object to grab things from
 * @returns {boolean} a truthy value
 */
export const __pathEq = (lenses, equiv, input) =>
  pathSatisfies(equals(equiv), lenses, input)
export const pathEq = curry(__pathEq)

export const __propIs = (type, property, input) =>
  pipe(
    prop(property),
    val => (val != null && val.constructor === type) || val instanceof type,
    Boolean
  )(input)
export const propIs = curry(__propIs)

/**
 * Grab a property from an object and compare it with a given value via ===
 * @method propEq
 * @param {string} property - a property
 * @param {any} equiv - equivalent value
 * @param {any} input - an object to grab things from
 * @returns {boolean} a truthy value
 */
export const __propEq = (property, equiv, input) =>
  pathSatisfies(equals(equiv), [property], input)
export const propEq = curry(__propEq)
