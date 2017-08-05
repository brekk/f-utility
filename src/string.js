import {e0, e1} from 'entrust'

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
export const split = e1(`split`)

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
export const trim = e0(`trim`)
