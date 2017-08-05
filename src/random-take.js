import {curry} from 'katsu-curry'
import {floor} from './random-floor'
import {iterate} from './iterate'

const {keys} = Object

/**
 * Take values randomly from objects or arrays
 * @function random.take
 * @param {boolean} encase - do we want to return the unwrapped value?
 * @param {mixed} input - an array or object
 * @return {mixed} either random values from the object.values or the array values, possibly wrapped
 * @public
 * @example
 * import {random} from 'f-utility'
 * const {take} = random
 * const a2e = `abcde`.split(``)
 * const a2eObject = {a: 1, b: 2, c: 3}
 * take(true, a2e) // [`a`]
 * take(true, a2e) // [`d`]
 * take(false, a2e) // `c`
 * take(false, a2e) // `b`
 * take(true, a2eObject) // {b: 2}
 * take(true, a2eObject) // {c: 3}
 * take(false, a2eObject) // 1
 * take(false, a2eObject) // 3
 */
export const take = curry((encase, o) => {
  // ducktype: array-like with something in it
  if (o && o[0] && o.length) {
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
 * partially-applied take - pull values randomly from an array or an object
 * @function random.pick
 * @param {Array|Object} x - something to take values from
 * @public
 * @example
 * import {random} from 'f-utility'
 * const {pick} = random
 * pick(`abcde`.split(``)) // `a`
 * pick(`abcde`.split(``)) // `d`
 * pick(`abcde`.split(``)) // `b`
 */
export const pick = take(false)

/**
 * partially-applied take - pull values randomly from an array or an object
 * @function random.grab
 * @param {Array|Object} x - something to take values from
 * @public
 * @example
 * import {random} from 'f-utility'
 * const {pick} = random
 * pick(`abcde`.split(``)) // [`a`]
 * pick(`abcde`.split(``)) // [`d`]
 * pick(`abcde`.split(``)) // [`b`]
 */
export const grab = take(true)

/**
 * pull some number of values from an array or object
 * @function random.allot
 * @param {number} howMany - how many values to take
 * @param {mixed} ofThing - array or object
 * @return {Array} values
 * @public
 * @example
 * import {random} from 'f-utility'
 * const {allot} = random
 * const a2e = `abcde`.split(``)
 * allot(3, a2e) // [`d`, `b`, `c`]
 * allot(3, a2e) // [`a`, `e`, `c`]
 * allot(3, a2e) // [`e`, `b`, `a`]
 * const a2eObject = {a: 1, b: 2, c: 3, d: 4, e: 5}
 * allot(3, a2eObject) // {d: 4, e: 5, a: 1}
 * allot(3, a2eObject) // {a: 1, c: 3, a: 1}
 */
export const allot = curry(
  (howMany, ofThing) => iterate(howMany, () => grab(ofThing))
)
