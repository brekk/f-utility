import {K, curry} from 'katsu-curry'
import {floor} from './random-floor'
import {iterate} from './iterate'

const {keys} = Object

/**
 * Take values randomly from objects or arrays
 * @function take
 * @param {boolean} encase - do we want to return the unwrapped value?
 * @param {mixed} input - an array or object
 * @return {mixed} either random values from the object.values or the array values, possibly wrapped
 * @private
 */
export const take = curry((encase, o) => {
  // ducktype: array-like with something in it
  if (o && o.length && !!o[0]) {
    const found = floor(o.length)
    const selection = o[found]
    return (
      !encase ?
      selection :
      [selection]
    )
  }
  // for objects
  const ks = keys(o)
  const index = floor(ks.length)
  const key = ks[index]
  const value = o[key]
  return (
    !encase ?
    value :
    {
      [key]: value
    }
  )
})

/**
 * partiallyApplied take
 * [a, b, c] => a|b|c
 * {a, b, c} => a|b|c
 * @function pick
 * @public
 */
export const pick = take(false)

/**
 * partiallyApplied take
 * {a, b, c} => {a}|{b}|{c}
 * [a, b, c] => [a]|[b]|[c]
 * @function grab
 * @public
 */
export const grab = take(true)

/**
 * pull some number of values from an array or object
 * @function allot
 * @param {number} howMany - how many values to take
 * @param {mixed} ofThing - array or object
 * @return {array} values
 * @public
 */
export const allot = curry(
  (howMany, ofThing) => iterate(howMany, K(pick(ofThing)))
)
