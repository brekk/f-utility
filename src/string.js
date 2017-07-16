import {e0, e1} from 'entrust'

/**
 * string.split(x) but delegatee last
 * @method split
 * @param {string} delimiter
 * @param {string} string - to split
 * @returns {strings[]}
 * @public
 */
export const split = e1(`split`)

/**
 * string.trim() but delegatee last
 * @method trim
 * @param {string} string - to trim
 * @returns {string} trimmed
 * @public
 */
export const trim = e0(`trim`)
