/* global test */
import {t} from './test-helpers'
import {map} from './map'
import {iterate} from './iterate'
import {random} from './random'
import {shuffle} from './random-shuffle'
import {floor, floorMin} from './random-floor'
import {pick, grab, allot} from './random-take'
import {word, wordSource} from './random-word'
import {keys, values} from './object'

const characters = [
  `abcdefghijklmnopqrstuvwxyz`,
  `ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
  `1234567890`,
  `~!@#$%^&*(),./;'[]\\<>?:{}|-=_+'\``
].join(``).split(``)

const charactersAsObjectList = characters.map(
  (x, index) => ({[`_` + x]: index})
).reduce(Object.assign, {})

test(`random should return a random number`, () => {
  t.is(typeof random, `function`)
  // we can get zeroes, so add one here
  t.is(typeof random(5), `number`)
  t.is(typeof random(), `number`)
})

test(`shuffle should shuffle a list`, () => {
  t.is(typeof shuffle, `function`)
  const makeInteger = () => random(1e3)
  const total = 10
  const list = iterate(total, makeInteger)
  const shuffled = shuffle(list)
  t.notDeepEqual(list, shuffled)
})

test(`floor should return a random number floored`, () => {
  t.is(typeof floor, `function`)
  const [a, b, c] = map(floor, [1e5, 1e5, 1e5])
  // I think this should be highly unlikely that three invocations return the same value?
  t.false((a === b) && (b === c))
})

test(`floorMin should return a random number floored with a minimum`, () => {
  t.is(typeof floorMin, `function`)
  const [a, b, c] = map(floorMin(100), [1e5, 1e5, 1e5])
  t.false((a === b) && (b === c))
})

test(`pick should take unwrapped values from arrays`, () => {
  const input = characters
  t.is(typeof pick, `function`)
  const picked = pick(input)
  t.true(input.indexOf(picked) > -1)
  const [a, b, c] = iterate(3, () => pick(input))
  t.false((a === b) && (b === c))
})

test(`pick should take unwrapped values from objects`, () => {
  const input = charactersAsObjectList
  const picked = pick(input)
  t.true(values(input).indexOf(picked) > -1)
  const output = iterate(3, () => pick(input))
  const [a, b, c] = output
  t.false((a === b) && (a === c))
})

test(`grab should take wrapped values from arrays`, () => {
  const input = characters
  t.is(typeof grab, `function`)
  const picked = grab(input)
  t.true(input.indexOf(picked[0]) > -1)
  const [[a], [b], [c]] = iterate(3, () => grab(input))
  t.false((a === b) && (b === c))
})

test(`word should return a random concatenation of letters`, () => {
  t.is(typeof word, `function`)
  const length = floorMin(1, 50)
  const invoked = word(length)
  const parts = invoked.split(``)
  const a = parts[0]
  const b = parts[parts.length - 1]
  t.falsy(a === b)
  t.is(invoked.length, length)
  t.is(typeof invoked, `string`)
  t.is(word().length, 5)
})
test(`wordSource should return a random concatenation of letters given a source`, () => {
  const out = wordSource([`a`], 10)
  t.is(out, `aaaaaaaaaa`)
})

test(`grab should take wrapped values from objects`, () => {
  const input = charactersAsObjectList
  const picked = grab(input)
  t.true(values(input).indexOf(values(picked)[0]) > -1)
  t.true(keys(input).indexOf(keys(picked)[0]) > -1)
  const [a, b, c] = iterate(3, () => grab(input))
  t.notDeepEqual(keys(a), keys(b))
  t.notDeepEqual(keys(b), keys(c))
})

test(`allot should randomly take a given number of values from a list`, () => {
  t.is(typeof allot, `function`)
  t.is(typeof allot(2), `function`)
  t.is(allot(5, characters).length, 5)
  const objectOutcome = allot(5, charactersAsObjectList)
  const [a, b] = Object.keys(objectOutcome)
  t.not(a, b)
  t.is(objectOutcome.length, 5)
})
