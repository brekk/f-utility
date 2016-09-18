import test from 'ava'
// import curry from 'lodash/fp/curry'
import map from 'lodash/fp/map'
import keys from 'lodash/fp/keys'
// import equals from 'lodash/fp/equals'
import values from 'lodash/fp/values'
import random from '../../src/testing/random'
import {iterate} from '../../src/fp/iterate'
import {mergePairs} from '../../src/fp/merge-pairs'

const characters = [
  `abcdefghijklmnopqrstuvwxyz`,
  `ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
  `1234567890`,
  `~!@#$%^&*(),./;'[]\\<>?:{}|-=_+'\``
].join(``).split(``)

const charactersAsObjectList = mergePairs(characters.map((x, index) => {
  // gotta be valid key names
  return [`_` + x, index]
}))

test(`random should return a random number`, (t) => {
  t.plan(2)
  t.is(typeof random, `function`)
  // we can get zeroes, so add one here
  t.is(typeof random(5), `number`)
})

test(`random.shuffle should shuffle a list`, (t) => {
  t.plan(2)
  t.is(typeof random.shuffle, `function`)
  const makeInteger = () => random(1e3)
  const total = 10
  const list = iterate(total, makeInteger)
  const shuffled = random.shuffle(list)
  t.notDeepEqual(list, shuffled)
})

test(`random.floor should return a random number floored`, (t) => {
  t.plan(2)
  t.is(typeof random.floor, `function`)
  const [a, b, c] = map(random.floor, [10, 10, 10])
  // I think this should be highly unlikely that three invocations return the same value?
  t.false((a === b) && (b === c))
})

test(`random.floorMin should return a random number floored with a minimum`, (t) => {
  t.plan(2)
  t.is(typeof random.floorMin, `function`)
  const [a, b, c] = map(random.floorMin, [10, 10, 10])
  t.false((a === b) && (b === c))
})

test(`random.take should fail when given a non-boolean "isWrapped" value`, (t) => {
  t.plan(2)
  t.is(typeof random.take, `function`)
  t.throws(() => random.take(`whatever`, {}), `Expected useWrapped to be a boolean.`)
})

test(`random.pick should take unwrapped values from arrays`, (t) => {
  const input = characters
  t.plan(3)
  t.is(typeof random.pick, `function`)
  const picked = random.pick(input)
  t.true(input.indexOf(picked) > -1)
  const [a, b, c] = iterate(3, () => random.pick(input))
  t.false((a === b) && (b === c))
})

test(`random.pick should take unwrapped values from objects`, (t) => {
  const input = charactersAsObjectList
  t.plan(3)
  const picked = random.pick(input)
  t.true(values(input).indexOf(picked) > -1)
  const output = iterate(3, () => random.pick(input))
  const [a, b, c] = output
  t.notDeepEqual(a, b)
  t.notDeepEqual(b, c)
})

test(`random.grab should take wrapped values from arrays`, (t) => {
  const input = characters
  t.plan(3)
  t.is(typeof random.grab, `function`)
  const picked = random.grab(input)
  t.true(input.indexOf(picked[0]) > -1)
  const [[a], [b], [c]] = iterate(3, () => random.grab(input))
  t.false((a === b) && (b === c))
})

test(`random.word should throw when given a non number`, (t) => {
  // t.plan(1)
  t.throws(() => random.word(false))
})

test(`random.word should return a random concatenation of letters`, (t) => {
  t.plan(3)
  t.is(typeof random.word, `function`)
  const length = random.floorMin(1, 50)
  const invoked = random.word(length)
  t.is(invoked.length, length)
  t.is(typeof invoked, `string`)
})

test(`random.grab should take wrapped values from objects`, (t) => {
  const input = charactersAsObjectList
  t.plan(4)
  const picked = random.grab(input)
  t.true(values(input).indexOf(values(picked)[0]) > -1)
  t.true(keys(input).indexOf(keys(picked)[0]) > -1)
  const [a, b, c] = iterate(3, () => random.grab(input))
  t.notDeepEqual(keys(a), keys(b))
  t.notDeepEqual(keys(b), keys(c))
})

test(`random.divvy should randomly take a given number of values from a list`, (t) => {
  t.plan(4)
  t.is(typeof random.divvy, `function`)
  t.is(typeof random.divvy(2), `function`)
  t.is(random.divvy(5, characters).length, 5)
  const objectOutcome = random.divvy(5, charactersAsObjectList)
  t.is(objectOutcome.length, 5)
})
