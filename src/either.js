import { e2 } from "entrust"

/**
 * a delegatee last function for Either.fold ing
 * @method fold
 * @param {function} badPath - a function
 * @param {function} goodPath - a function
 * @param {Right|Left} either - an Either
 * @returns {*} the result of the fold
 * @public
 * @example
 * import {I, I, pipe, fold} from 'f-utility'
 * import {Left, Right} from 'fantasy-eithers'
 * const saferDivide = (a, b) => (b !== 0 ? Right(a / b) : Left(`Cannot divide by zero`))
 * fold(I, I, saferDivide(1, 2)) // 0.5
 * fold(I, I, saferDivide(1, 0)) // `Cannot divide by zero`
 */
export const fold = e2(`fold`)
