import {pipe, curry} from 'katsu-curry'
import {reduce} from './reduce'
import {equals} from './math'

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
export const 𝘍pathOr = (def, lenses, input) => reduce(
  (focus, lens) => focus[lens] || def,
  input,
  lenses
)
export const pathOr = curry(𝘍pathOr)

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
export const 𝘍propOr = (def, property, input) => pathOr(def, [property], input)
export const propOr = curry(𝘍propOr)

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
 * Grab a property from an object and compare it with a given function
 * @method pathIs
 * @param {function} is - an assertion function
 * @param {strings[]} lenses - a property
 * @param {any} input - an object to grab things from
 * @returns {boolean} a truthy value
 */
export const 𝘍pathIs = (is, lenses, input) => pipe(
  path(lenses),
  is,
  Boolean
)(input)
export const pathIs = curry(𝘍pathIs)

/**
 * Grab a property from an object and compare it with a given value via ===
 * @method pathEq
 * @param {any} equiv - equivalent value
 * @param {strings[]} lenses - a property
 * @param {any} input - an object to grab things from
 * @returns {boolean} a truthy value
 */
export const 𝘍pathEq = (equiv, lenses, input) => pathIs(
  equals(equiv),
  lenses,
  input
)
export const pathEq = curry(
  𝘍pathEq
)

/**
 * Grab a property from an object and compare it with a given function
 * @method propEq
 * @param {any} equiv - equivalent value
 * @param {string} property - a property
 * @param {any} input - an object to grab things from
 * @returns {boolean} a truthy value
 */
export const 𝘍propIs = (equiv, property, input) => pipe(
  prop([property]),
  equiv,
  Boolean
)(input)
export const propIs = curry(𝘍propIs)

/**
 * Grab a property from an object and compare it with a given value via ===
 * @method propEq
 * @param {any} equiv - equivalent value
 * @param {string} property - a property
 * @param {any} input - an object to grab things from
 * @returns {boolean} a truthy value
 */
export const 𝘍propEq = (equiv, property, input) => pathIs(
  equals(equiv),
  [property],
  input
)
export const propEq = curry(
  𝘍propEq
)
