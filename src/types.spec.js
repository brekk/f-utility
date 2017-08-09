/* global test */
import {t} from './test-helpers'
import {$} from 'katsu-curry'
import {map} from './map'
import {freeze} from './object'
import {floorMin} from './random-floor'
import {isString, isNil, isBoolean, isNumber, isObject, isFunction, isDistinctObject} from './types'

const allTypes = freeze({
  booleanTrue: true,
  booleanFalse: false,
  nilNull: null,
  nilUndefined: undefined,
  notANumber: NaN,
  numberZero: 0,
  numberPositive: 1,
  numberNegative: -1,
  numberPostiveRandom: floorMin(0, 1e3),
  numberNegativeRandom: floorMin(0, -1e3),
  functionNullary: () => {},
  method() {},
  string: `string`,
  object: {},
  array: []
})

const apply = map($, allTypes)

test(`types - isString!`, () => {
  const strings = apply(isString)
  t.deepEqual(strings, {
    booleanTrue: false,
    booleanFalse: false,
    nilNull: false,
    nilUndefined: false,
    notANumber: false,
    numberZero: false,
    numberPositive: false,
    numberNegative: false,
    numberPostiveRandom: false,
    numberNegativeRandom: false,
    functionNullary: false,
    method: false,
    string: true,
    object: false,
    array: false
  })
})
test(`types - isNil!`, () => {
  const nils = apply(isNil)
  t.deepEqual(nils, {
    booleanTrue: false,
    booleanFalse: false,
    nilNull: true,
    nilUndefined: true,
    notANumber: false,
    numberZero: false,
    numberPositive: false,
    numberNegative: false,
    numberPostiveRandom: false,
    numberNegativeRandom: false,
    functionNullary: false,
    method: false,
    string: false,
    object: false,
    array: false
  })
})
test(`types - isBoolean!`, () => {
  const bools = apply(isBoolean)
  t.deepEqual(bools, {
    booleanTrue: true,
    booleanFalse: true,
    nilNull: false,
    nilUndefined: false,
    notANumber: false,
    numberZero: false,
    numberPositive: false,
    numberNegative: false,
    numberPostiveRandom: false,
    numberNegativeRandom: false,
    functionNullary: false,
    method: false,
    string: false,
    object: false,
    array: false
  })
})
test(`types - isNumber!`, () => {
  const numbers = apply(isNumber)
  t.deepEqual(numbers, {
    booleanTrue: false,
    booleanFalse: false,
    nilNull: false,
    nilUndefined: false,
    notANumber: true,
    numberZero: true,
    numberPositive: true,
    numberNegative: true,
    numberPostiveRandom: true,
    numberNegativeRandom: true,
    functionNullary: false,
    method: false,
    string: false,
    object: false,
    array: false
  })
})
test(`types - isObject!`, () => {
  const objects = apply(isObject)
  t.deepEqual(objects, {
    booleanTrue: false,
    booleanFalse: false,
    nilNull: true,
    nilUndefined: false,
    notANumber: false,
    numberZero: false,
    numberPositive: false,
    numberNegative: false,
    numberPostiveRandom: false,
    numberNegativeRandom: false,
    functionNullary: false,
    method: false,
    string: false,
    object: true,
    array: true
  })
})
test(`types - isFunction!`, () => {
  const functions = apply(isFunction)
  t.deepEqual(functions, {
    booleanTrue: false,
    booleanFalse: false,
    nilNull: false,
    nilUndefined: false,
    notANumber: false,
    numberZero: false,
    numberPositive: false,
    numberNegative: false,
    numberPostiveRandom: false,
    numberNegativeRandom: false,
    functionNullary: true,
    method: true,
    string: false,
    object: false,
    array: false
  })
})

test(`types - isDistinctObject!`, () => {
  const distincts = apply(isDistinctObject)
  t.deepEqual(distincts, {
    booleanTrue: false,
    booleanFalse: false,
    nilNull: false,
    nilUndefined: false,
    notANumber: false,
    numberZero: false,
    numberPositive: false,
    numberNegative: false,
    numberPostiveRandom: false,
    numberNegativeRandom: false,
    functionNullary: false,
    method: false,
    string: false,
    object: true,
    array: false
  })
})
