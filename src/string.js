import { curry } from "katsu-curry"
import { e0, e1, e2 } from "entrust"

/**
 * string.split(x) but delegatee last
 * @method split
 * @param {string} delimiter
 * @param {string} string - to split
 * @returns {strings[]}
 * @public
 * @example
 * import {split} from `f-utility`
 * split(`x`, `1x2x3`) // [`1`, `2`, `3`]
 */

/**
 * string.trim() but delegatee last
 * @method trim
 * @param {string} string - to trim
 * @returns {string} trimmed
 * @public
 * @example
 * import {trim} from `f-utility`
 * trim(`     20932 `) // `20932`
 */

/**
 * string.replace but delegatee last
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
 * @method replace
 * @param {string} - a string or a regular expression
 * @param {function} - a string or a function
 * @returns {string} string with replacements
 */

// NULLARY
export const trim = e0(`trim`)

// UNARY
export const charAt = e1(`charAt`)
export const codePointAt = e1(`codePointAt`)
export const match = curry((a, b) => {
  const z = b.match(a)
  return z === null ? [] : z
})
// export const repeat = e1(`repeat`)
export const repeat = curry((x, n) => {
  let output = new Array(n)
  for (let i = 0; i < n; i++) {
    output[i] = x
  }
  return output
})
export const search = e1(`search`)
export const split = e1(`split`)

// BINARY
export const endsWithLength = e2(`endsWith`)
export const __endsWith = (x, i) => {
  const last = i[i.length - 1]
  return Array.isArray(x) ? last === x[0] : last === x
}
export const endsWith = curry(__endsWith)

export const indexOfFromIndex = e2(`indexOf`)
// the optional fromIndex param above is easy to forget
export const __indexOf = (toSearch, x) => indexOfFromIndex(toSearch, 0, x)
export const indexOf = curry(__indexOf)
export const lastIndexOfFromIndex = e2(`lastIndexOf`)
// samesies
export const __lastIndexOf = (toSearch, x) =>
  lastIndexOfFromIndex(toSearch, Infinity, x)
export const lastIndexOf = curry(__lastIndexOf)
export const padEnd = e2(`padEnd`)
export const padStart = e2(`padStart`)
export const replace = e2(`replace`)
export const startsWithFromPosition = e2(`startsWith`)
// export const __startsWith = (toSearch, x) =>
//   startsWithFromPosition(toSearch, 0, x)
// export const startsWith = curry(__startsWith)
export const __startsWith = (x, i) => {
  const first = i[0]
  return Array.isArray(x) ? first === x[0] : first === x
}
export const startsWith = curry(__startsWith)
export const substr = e2(`substr`)
