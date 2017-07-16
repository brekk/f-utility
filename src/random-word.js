import {pipe, curry} from 'katsu-curry'
import {allot} from './random-take'
import {join} from './array'

const alphabet = `abcdefghijklmnopqrstuvwxyz`.split(``)

/**
 * generate a "word" of some known length
 * @function word
 * @param {number} howLong - how many characters should be used?
 * @return {string} word
 */
export const wordSource = curry(
  (source, howLong) => pipe(
    allot(howLong),
    join(``)
  )(source)
)

export const word = (x = 5) => wordSource(alphabet, x)
