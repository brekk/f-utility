import {e1} from 'entrust'
import {curry} from 'katsu-curry'
import {filter} from './filter'

/**
 * string.prototype.join but curried
 * @method join
 * @param {string} delimiter
 * @param {Array} list
 * @returns {string} joined
 * @public
 * @example
 * import {join} from 'f-utility'
 * join(`x`, [1,2,3]) // `1x2x3`
 */
export const join = e1(`join`)

/**
 * return a new array with some other stuff added to it
 * @method concat
 * @param {Array} - an array
 * @param {Array} - another array
 * @returns {Array} - combined array
 */
export const concat = e1(`concat`)

/**
 * string.prototype.sort but curried
 * @method sort
 * @param {function} fn
 * @param {Array} functor
 * @returns {Array} sorted
 * @public
 * @example
 * import {sort} from 'f-utility'
 * sort((x) => x % 2, [1,2,3,4,5,6,7,8]) // [ 0, 2, 4, 6, 8, 9, 7, 5, 3, 1 ]
 */
// we can't just invert things with entrust, as sort is a mutating method
// export const sort = e1(`sort`)

export const sort = curry((fn, functor) => {
  const copy = Array.from(functor)
  copy.sort(fn)
  return copy
})

/**
 * get the difference between two arrays
 * @method difference
 * @param {Array} bList - an array
 * @param {Array} aList - an array
 * @returns {Array} filtered array with differences between the two arrays
 * @public
 * @example
 * import {difference} from 'f-utility'
 * difference([1,2,3], [2,4,6]) // [4, 6]
 * difference([2,4,6], [1,2,3]) // [1, 3]
 */
export const difference = curry(
  (bList, aList) => filter((x) => !bList.includes(x), aList)
)

/**
 * get both the differences between two arrays, and if one difference is longer, return it
 * @method symmetricDifference
 * @param {Array} a - an array
 * @param {Array} b - an array
 * @returns {Array} filtered array with differences between the two arrays
 * @public
 * @example
 * import {symmetricDifference} from 'f-utility'
 * difference([1,2,3], [1,2]) // [3]
 */
export const symmetricDifference = curry((a, b) => {
  const ab = difference(a, b)
  const ba = difference(b, a)
  return (
    ab.length > ba.length ?
      ab :
      ba
  )
})

/**
 * alter the index of a given array input
 * @method alterIndex
 * @param {Number} index - the index to alter
 * @param {Function} fn - the function to describe the alteration
 * @param {Array} input - the input array
 * @returns {Array} an altered copy of the original array
 * @public
 * @example
 * import {alterIndex} from 'f-utility'
 * const input = `abcde`.split(``)
 * alterIndex(0, () => `butts`, input) // [`butts`, `b`, `c`, `d`, `e`]
 * // also works with negative indicies
 * alterIndex(-1, () => `x`, input) // [`a`, `b`, `c`, `d`, `x`]
 */

export const alterIndex = curry((index, fn, input) => {
  const copy = Array.from(input)
  const relativeIndex = (
    index > 0 ?
      index :
      copy.length - Math.abs(index)
  )
  copy[relativeIndex] = fn(copy[relativeIndex])
  return copy
})

export const alterFirstIndex = alterIndex(0)
export const alterLastIndex = alterIndex(-1)
