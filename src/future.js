import {e2} from 'entrust'

/**
 * a delegatee last function for Future.fork ing
 * @method fork
 * @param {fn} badPath
 * @param {fn} goodPath
 * @param {Future} future
 * @returns {*} the result of the fork
 * @public
 */
export const fork = e2(`fork`)
