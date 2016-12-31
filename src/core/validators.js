import curry from 'lodash/fp/curry'
import reduce from 'lodash/fp/reduce'
import cloneDeep from 'lodash/fp/cloneDeep'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'

import Validation from 'folktale/data/validation'

const {Failure, Success} = Validation

/**
 * @namespace util.validation
 * @function ofType
 * @curried
 * @param {string} type - to compare in typeof, unless `array`
 * @param {mixed} thing - thing to assert the type of
 * @return {boolean} value
 */
export const ofType = curry(function _ofType(type, thing) {
  if (type === `array`) {
    return thing && typeof thing === `object` && Array.isArray(thing)
  }
  return (typeof thing === type) && (typeof thing !== `undefined`)
})

const isTypeReducer = (struct, x) => {
  const newStruct = {...struct}
  newStruct[x] = ofType(x)
  return newStruct
}

const mostTypes = [
  `string`,
  `number`,
  `object`,
  `boolean`,
  `array`
]
/**
 * @namespace util.validation
 * @const isType
 * @desc an object whose properties are all morphs of the `ofType` function
 */
export const isType = reduce(isTypeReducer, {}, mostTypes)

// `function` is a reserved word
isType.fn = ofType(`function`)

const types = [
  ...mostTypes,
  `fn`
]

/**
 * @namespace util.validation
 * @function validateType
 * @param {object} oldTypes - the aggregation object
 * @param {string} type - the name of the function being referenced from isType
 * @param {Success|Failure} outcome - a Success/Failure validation object
 * @return {object} an object
 */
const validateType = (oldTypes, type) => {
  const newTypes = {...oldTypes}
  newTypes[type] = (thing) => {
    const match = isType[type](thing)
    if (!match) {
      // throw new TypeError(`Expected thing to be a ${toCheck}.`)
      return Failure([`Expected typeof thing to equal '${type}'.`])
    }
    return Success(thing)
  }
  return newTypes
}

/**
 * @namespace util.validation
 * @const isValid
 * @desc an object whose properties are all morphs of `validateType` function
 */
export const isValid = reduce(validateType, {}, types)

/**
 * @namespace util.validation
 * @function addValueToFailureOrSuccess
 * @desc a function which is used internally to an aggregator `isValidReducer`
 * @param {object} container - some object
 * @param {boolean} isFailure - the result of some Validation
 * @param {mixed} output - some value to save if isFailure is false
 * @param {object} aggregated object
 * @return {object} aggregated object
 */
const addValueToFailureOrSuccess = (container, isFailure, output) => {
  const copy = cloneDeep(container)
  const key = isFailure ? `successes` : `failures`
  if (isFailure) {
    copy[key] = copy[key].concat(output)
  }
  return copy
}

/**
 * @namespace util.validation
 * @function getOrPullValue
 * @desc a simple ternary plus a function
 * @param {boolean} pullData - a boolean value
 * @param {function} puller - a function to call with value if pullData is true
 * @param {mixed} value - anything
 * @return {mixed} value or puller(value)
 */
export const getOrPullValue = (pullData, puller, value) => {
  return pullData ? puller(value) : value
}

/**
 * @namespace util.validation
 * @function isValidReducer
 * @desc used internally to `isValidSplitter`
 * @param {function} pullValue - a synchronous function
 * @param {array} list - an array of Validations
 * @param {object} structure - an aggregation object
 * @param {Validation} item - a Validation object
 * @return {object} aggregated object
 */
export const isValidReducer = curry(function _isValidReducer(pullValue, list, structure, item) {
  const getValue = (x) => list[x]
  const output = getOrPullValue(pullValue, getValue, structure.index)
  // const output = getValue(copy.index)
  const copy = addValueToFailureOrSuccess(structure, Failure.hasInstance(item), output)
  copy.index = structure.index + 1
  return copy
})

/**
 * @namespace util.validation
 * @function pullFailuresAndSuccesses
 * @param {array} $0.failures - a property on the given object
 * @param {array} $0.successes - a property on the given object
 * @return {object} object with failures & successes
 */
export const pullFailuresAndSuccesses = ({failures, successes}) => ({failures, successes})

export const isValidSplitter = curry(function _isValidSplitter(asIndexes, validator, list) {
  const initialState = {failures: [], successes: [], index: 0}
  return flow(
    map(validator),
    reduce(isValidReducer(asIndexes, list), initialState),
    pullFailuresAndSuccesses
  )(list)
})

const makeValidSplitter = curry(function _makeValidSplitter(asIndexes, oldTypes, type) {
  const newTypes = cloneDeep(oldTypes)
  newTypes[type] = isValidSplitter(asIndexes, isValid[type])
  return newTypes
})

/**
 * @namespace util.validation
 * @function splitters
 * @param {boolean} asIndexes - return values as indices or raw values
 * @return {object} an object with failures & successes && index
 */
export const splitters = (asIndexes) => {
  return reduce(makeValidSplitter(asIndexes), {}, types)
}

export const splitValidListAsIndex = splitters(true)
export const splitValidList = splitters(false)
