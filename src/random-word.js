import {pipe, curry} from 'katsu-curry'
import {allot} from './random-take'
import {join} from './array'

const alphabet = `abcdefghijklmnopqrstuvwxyz`.split(``)

/**
 * generate a "word" of some known length
 * @function random.wordSource
 * @param {strings[]} source - which characters should be used?
 * @param {number} howLong - how many characters should be used?
 * @return {string} word
 * @public
 * @example
 * import {random} from 'f-utility'
 * const {wordSource} = random
 * const dna = wordSource([`g`, `a`, `t`, `c`])
 * dna(7) // `gattaca`
 */
export const wordSource = curry(
  (source, howLong) => pipe(
    allot(howLong),
    join(``)
  )(source)
)

/**
 * generate a "word" of some known length
 * @function random.word
 * @param {number} x - how many characters should be used?
 * @return {string} word
 * @public
 * @example
 * import {random} from 'f-utility'
 * const {word} = random
 * word(5) // `lrmbs`
 */
export const word = (x = 5) => wordSource(alphabet, x)
