import _flatMap from "flatmap-fast"
import { delegateFastBinary } from "./delegate-fast"

/**
 * functor.chain(fn) but curried and fast
 * @method chain
 * @param {function} predicate
 * @param {Array|Monad} iterable
 * @returns {Array|Monad} flat mapped iterable
 * @public
 * @example
 * import {chain} from 'f-utility'
 * const split = (x) => x.split(``)
 * const flatSplit = chain(split)
 * const a = flatSplit([`chain`, `is`, `flatMap`])
 * console.log(a) // [ 'c', 'h', 'a', 'i', 'n', 'i', 's', 'f', 'l', 'a', 't', 'M', 'a', 'p' ]
 */
export const chain = delegateFastBinary(`chain`, _flatMap)
export const flatMap = chain
