import test from 'ava'
import {
  contract,
  signContract,
  structureErrors,
  returnExpectation,
  throwExpectation
} from '../../src/core/error'
import random from '../../src/testing/random'

test(`throwExpectation must throw when a given value isn't present on the given object`, (t) => {
  t.plan(4)
  const word = random.word(10)
  const args = [word, {a: 1}, `b`]
  t.is(typeof throwExpectation, `function`)
  t.is(typeof throwExpectation(args[0]), `function`)
  t.is(typeof throwExpectation(args[0], args[1]), `function`)
  t.throws(() => throwExpectation(...args), `Expected to find ${args[2]} on ${word}.`)
})
test(`throwExpectation must not throw when a given value is present on the given object`, (t) => {
  t.plan(1)
  const word = random.word(10)
  t.notThrows(() => throwExpectation(word, {a: 1}, `a`))
})
test(`returnExpectation must return an [error, key, value] triplet`, (t) => {
  t.plan(6)
  t.is(typeof returnExpectation, `function`)
  t.is(typeof returnExpectation(1), `function`)
  t.is(typeof returnExpectation(1, 1), `function`)
  const x = () => random.word(10)
  const context = `context` + x()
  const match = x()
  const value = x()
  const container = {
    [x()]: x(),
    [match]: value,
    [x()]: x()
  }
  const output = returnExpectation(context, container, match)
  t.deepEqual(output, [false, match, value])
  const output2 = returnExpectation(context, container, `match`)
  t.deepEqual(output2, [true, `match`, context])
  const output3 = returnExpectation(
    context, {...container,
      propertyWhichIsFalseButExists: false
    }, `propertyWhichIsFalseButExists`
  )
  t.deepEqual(output3, [false, `propertyWhichIsFalseButExists`, false])
})

test(`structureErrors`, (t) => {
  t.plan(5)
  t.is(typeof structureErrors, `function`)
  t.throws(() => structureErrors(null, `abc`.split(``)), `Expected to get a valid object.`)
  t.throws(() => structureErrors({}, null), `Unable to deal with non-triplet array.`)
  const word = random.word(10)
  const output = structureErrors({}, [false, `a`, word])
  t.deepEqual(output, {errors: [], values: [{a: word}], hasErrors: false})
  const word2 = random.word(10)
  const output2 = structureErrors({}, [true, `a`, word2])
  t.deepEqual(output2, {
    errors: [`a`],
    values: [],
    hasErrors: true,
    context: word2
  })
})

test(`signContract`, (t) => {
  t.plan(7)
  t.is(typeof signContract, `function`)
  t.is(typeof signContract(1), `function`)
  const output = signContract(true, structureErrors({}, [true, `a`, `b`]))
  t.deepEqual(output, {})
  t.throws(
    () => signContract(false, structureErrors({}, [true, `a`, `b`])),
    `Unable to access [a] properties on b`
  )
  const invalidObject = {errors: [], hasErrors: false}
  t.throws(
    () => signContract(false, invalidObject),
    `Expected to be able to find 'values' on info object.`
  )
  const output2 = signContract(true, invalidObject)
  t.deepEqual(output2, {})
  const word = random.word(10)
  const structure = structureErrors({}, [false, `a`, word])
  const word2 = random.word(10)
  structure.values.push({b: word2})
  const output3 = signContract(true, structure)
  t.deepEqual(output3, {a: word, b: word2})
})

test(`contract`, (t) => {
  t.plan(9)
  t.is(typeof contract, `function`)
  t.is(typeof contract(1), `function`)
  t.is(typeof contract(1, 1), `function`)
  t.is(typeof contract(1, 1, 1), `function`)
  const x = () => random.word(10)
  const context = `context`
  const lookup = x()
  const value = x()
  const lookup2 = x()
  const value2 = x()
  const container = {
    [x()]: x(),
    [lookup]: value,
    [lookup2]: value2
  }
  const output = contract(true, context, container, [lookup, lookup2])
  t.deepEqual(output, {[lookup]: value, [lookup2]: value2})
  const failOutput = contract(true, context, container, `ab`.split(``))
  t.deepEqual(failOutput, {})
  t.throws(
    () => contract(false, context, container, `ab`.split(``)),
    `Unable to access [a,b] properties on context`
  )
  t.notThrows(
    () => contract(false, context, {
      a: false,
      b: false,
      c: false
    }, `abc`.split(``))
  )
  t.deepEqual(contract(false, context, {
    a: false,
    b: false,
    c: false,
    five: 5
  }, [`b`, `five`]), {b: false, five: 5})
})
