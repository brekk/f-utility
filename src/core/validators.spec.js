import test from 'ava'

import id from 'lodash/fp/identity'
import keys from 'lodash/fp/keys'
import curry from 'lodash/fp/curry'
import flow from 'lodash/fp/flow'
import without from 'lodash/fp/without'
import compact from 'lodash/fp/compact'

import Validation from 'folktale/data/validation'
const {Failure} = Validation

import {
  isType,
  isValid,
  splitters,
  // isValidReducer,
  // pullFailuresAndSuccesses,
  isValidSplitter
} from '../../src/core/validators'
import random from '../../src/testing/random'

const inputs = {
  string: () => random.word(10),
  number: () => random.floorMin(1, 1e5),
  object: () => ({}),
  fn: () => () => ({}),
  array: () => ([]),
  boolean: () => !!((Math.random() * 1) > 0.5)
}
const getInvalid = curry((obj, toOmit) => {
  const keyRemover = without([toOmit])
  const findValidTest = flow(
    keys,
    random.shuffle,
    keyRemover,
    compact,
    // arrays and objects ain't typeof safe, so we remove additional
    toOmit === `object` ? without([`array`]) : id,
    toOmit === `array` ? without([`object`]) : id
  )
  const method = findValidTest(obj)[0]
  return obj[method]
})
const getInvalidInput = getInvalid(inputs)

test(`isType.string should be a type assertion method`, (t) => {
  t.plan(7)
  t.is(typeof isType, `object`)
  t.is(typeof isType.string, `function`)
  t.truthy(isType.string(``))
  t.falsy(isType.string(null))
  t.falsy(isType.string(1))
  t.falsy(isType.string(false))
  t.falsy(isType.string({}))
})

test(`isType.number should be a type assertion method`, (t) => {
  t.plan(5)
  t.is(typeof isType.number, `function`)
  t.truthy(isType.number(1))
  t.falsy(isType.number(null))
  t.falsy(isType.number({}))
  t.falsy(isType.number(false))
})

test(`isType.object should be a type assertion method`, (t) => {
  t.plan(5)
  t.is(typeof isType.object, `function`)
  t.truthy(isType.object({}))
  t.truthy(isType.object(null))
  t.falsy(isType.object(1))
  t.falsy(isType.object(false))
})

test(`isType.boolean should be a type assertion method`, (t) => {
  t.plan(6)
  t.is(typeof isType.boolean, `function`)
  t.truthy(isType.boolean(true))
  t.truthy(isType.boolean(false))
  t.falsy(isType.boolean(null))
  t.falsy(isType.boolean({}))
  t.falsy(isType.boolean(-222))
})

test(`isType.fn should be a type assertion method`, (t) => {
  t.plan(5)
  t.is(typeof isType.fn, `function`)
  const noop = () => null
  t.truthy(isType.fn(noop))
  t.falsy(isType.fn(null))
  t.falsy(isType.fn({}))
  t.falsy(isType.fn(-222))
})

test(`isType.array should be a type assertion method`, (t) => {
  t.plan(6)
  t.is(typeof isType.array, `function`)
  t.truthy(isType.array([]))
  t.falsy(isType.array(null))
  t.falsy(isType.array({}))
  t.falsy(isType.array(-222))
  t.falsy(isType.array(false))
})

test(`isValid should be an object whose methods are null-safe type assertions`, (t) => {
  t.plan(6)
  t.is(typeof isValid, `object`)
  t.is(typeof isValid.string, `function`)
  t.is(typeof isValid.number, `function`)
  t.is(typeof isValid.object, `function`)
  t.is(typeof isValid.fn, `function`)
  t.is(typeof isValid.array, `function`)
})

const testMethod = curry((methodName, t) => {
  // const isntArray = methodName !== `array`
  const method = isValid[methodName]
  const failee = getInvalidInput(methodName)()
  const failureObj = method(failee)
  t.plan(7)
  t.truthy(failureObj)
  t.truthy(Failure.hasInstance(failureObj))
  t.truthy(failureObj.value)
  t.deepEqual(failureObj.value, [`Expected typeof thing to equal '${methodName}'.`])
  const value = inputs[methodName]
  const rawValue = value()
  const successObj = method(rawValue)
  t.truthy(successObj)
  t.falsy(Failure.hasInstance(successObj))
  t.deepEqual(successObj.value, rawValue)
})

test(`isValid.object should test objects`, testMethod(`object`))
test(`isValid.number should test numbers`, testMethod(`number`))
test(`isValid.boolean should test booleans`, testMethod(`boolean`))
test(`isValid.fn should test functions`, testMethod(`fn`))
test(`isValid.array should test arrays`, testMethod(`array`))

test(`splitters should be function which expects a boolean and returns an object`, (t) => {
  t.plan(6)
  t.is(typeof splitters, `function`)
  const output = splitters(true)
  t.is(typeof output.string, `function`)
  t.is(typeof output.number, `function`)
  t.is(typeof output.object, `function`)
  t.is(typeof output.fn, `function`)
  t.is(typeof output.array, `function`)
})

const assertAboutSplitter = curry((asIndicies, methodName, t) => {
  const splitterObject = splitters(asIndicies)
  const method = splitterObject[methodName]
  const failee = getInvalidInput(methodName)()
  const valid = inputs[methodName]
  const output = method([valid, failee])
  t.plan(1)
  t.truthy(output)
})

test(`isValidSplitter`, (t) => {
  // t.plan(4)
  t.truthy(isValidSplitter)
  t.is(typeof isValidSplitter, `function`)
  t.is(typeof isValidSplitter(true), `function`)
  t.is(typeof isValidSplitter(true, {}), `function`)
  t.is(typeof isValidSplitter(true, {}, `string`), `object`)
})

test(`isValidSplitter.object should validate a list of objects as indices`,
  assertAboutSplitter(true, `object`)
)
test(`isValidSplitter.object should validate a list of objects`,
  assertAboutSplitter(false, `object`)
)
test(`isValidSplitter.number should validate a list of numbers as indices`,
  assertAboutSplitter(true, `number`)
)
test(`isValidSplitter.number should validate a list of numbers`,
  assertAboutSplitter(false, `number`)
)
test(`isValidSplitter.boolean should validate a list of booleans as indices`,
  assertAboutSplitter(true, `boolean`)
)
test(`isValidSplitter.boolean should validate a list of booleans`,
  assertAboutSplitter(false, `boolean`)
)
test(`isValidSplitter.fn should validate a list of functions as indices`,
  assertAboutSplitter(true, `fn`)
)
test(`isValidSplitter.fn should validate a list of functions`,
  assertAboutSplitter(false, `fn`)
)
test(`isValidSplitter.array should validate a list of arrays as indices`,
  assertAboutSplitter(true, `array`)
)
test(`isValidSplitter.array should validate a list of arrays`,
  assertAboutSplitter(false, `array`)
)
