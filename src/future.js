import { e2 } from "entrust"

/**
 * a delegatee last function for Future.fork ing
 * @method fork
 * @param {function} badPath - a function
 * @param {function} goodPath - a function
 * @param {Future} future
 * @returns {*} the result of the fork
 * @public
 * @example
 * import {pipe, fork, I} from 'f-utility'
 * import {trace} from 'xtrace'
 * import F from 'fluture'
 * const odd = (x) => (x % 2 === 0 ? F.of(x) : F.reject(`${x} is odd`))
 * const semiSafeOddity = pipe(
 *   odd,
 *   trace(`oddity`),
 *   fork(console.warn, console.log)
 * )
 * semiSafeOddity(5) // console.warn(`5 is odd`)
 * semiSafeOddity(4) // console.log(4)
 */
export const fork = e2(`fork`)
