import curry from 'ramda/src/curry'
// import map from 'ramda/src/map'
import flow from 'ramda/src/pipe'
// import reduce from 'ramda/src/reduce'
// import merge from 'ramda/src/merge'
import {join} from '../fp/array'
import {iterate} from '../fp/iterate'
import {isType} from '../core/validators'

const alphabet = `abcdefghijklmnopqrstuvwxyz`.split(``)

/**
 * Simple wrap for round( x * random )
 * @function random
 * @param {number} x - a number
 * @return {number} x - a rounded and randomized number
 */
export const random = (x = 1) => Math.round(Math.random() * x)

/**
 * Shuffle the contents of an array
 * @function shuffle
 * @param {array} list - an array to be shuffled
 * @return {array} shuffled
 */
export const shuffle = (list) => {
  const newList = [...list]
  // modified fisher-yates shuffle
  let start = newList.length
  while (start-- > 0) {
    const index = Math.floor(Math.random() * start + 1)
    const current = newList[index]
    const newer = newList[start]
    newList[index] = newer
    newList[start] = current
  }
  return newList
}

/**
 * Simple wrap for floor( x * random )
 * @function floor
 * @param {number} x - a number
 * @return {number} x - a rounded number
 */
export const floor = (x) => Math.floor(Math.random() * x)

/**
 * Simple wrap for floor( x * random ) + min
 * @function floorMin
 * @curried
 * @param {number} min - a number to be the minimum
 * @param {number} x - a number to be randomly rounded
 * @return {number} a number that is randomly above the min
 */
export const floorMin = curry((min, x) => floor(x) + min)

/**
 * Take values randomly from objects or arrays
 * @function take
 * @param {boolean} useWrapped - do we want to return the unwrapped value?
 * @param {mixed} input - an array or object
 * @return {mixed} either random values from the object.values or the array values, possibly wrapped
 */
export const take = curry((useWrapped, o) => {
  if (!isType.boolean(useWrapped)) {
    throw new TypeError(`Expected useWrapped to be a boolean.`)
  }
  // ducktype: array-like with something in it
  if (o && o.length && !!o[0]) {
    const found = floor(o.length)
    const selection = o[found]
    if (!useWrapped) {
      return selection
    }
    return [selection]
  }
  // for objects
  const keys = Object.keys(o)
  const index = floor(keys.length)
  const key = keys[index]
  const value = o[key]
  if (!useWrapped) {
    return value
  }
  const out = {
    [key]: value
  }
  return out
})

/**
 * [a, b, c] => a|b|c
 * {a, b, c} => a|b|c
 * @function pick
 * @partiallyApplied take
 */
export const pick = take(false)
/**
 * {a, b, c} => {a}|{b}|{c}
 * [a, b, c] => [a]|[b]|[c]
 * @function grab
 * @partiallyApplied take
 */
export const grab = take(true)

// (2, [a, b, c, d]) => [c, a]
/**
 * pull some number of values from an array or object
 * @function divvy
 * @param {number} howMany - how  many values to take
 * @param {mixed} ofThing - array or object
 * @return {array} values
 */
export const divvy = curry((howMany, ofThing) => {
  const picker = () => pick(ofThing)
  return iterate(howMany, picker)
})

/**
 * generate a "word" of some known length
 * @function word
 * @param {number} howLong - how many characters should be used?
 * @return {string} word
 */
export const word = (howLong = 5) => {
  if (!isType.number(howLong)) {
    throw new TypeError(`Expected to be given number for howLong.`)
  }
  return flow(
    divvy(howLong),
    join(``)
  )(alphabet)
}

Object.assign(random, {
  shuffle,
  floor,
  floorMin,
  take,
  pick,
  grab,
  divvy,
  word
})

export default random
