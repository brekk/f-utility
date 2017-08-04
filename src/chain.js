import _flatMap from 'flatmap-fast'
import {delegateFastBinary} from './delegate-fast'

/**
 * functor.chain(fn) but curried and fast
 * @method chain
 * @param {function} predicate
 * @param {Array} iterable
 * @returns {Array} flat mapped iterable
 * @public
 */
export const chain = delegateFastBinary(`chain`, _flatMap)
export const flatMap = chain
