import curry from 'lodash/fp/curry'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import reduce from 'lodash/fp/reduce'
import merge from 'lodash/fp/merge'
import getOr from 'lodash/fp/getOr'
// import {mergePairs} from './merge-pairs'
import clone from 'lodash/fp/cloneDeep'
// import {trace} from './functional-patterns'

/**
 * Either throw a context-based error, or do nothing.
 * @function throwExpectation
 * @curried
 * @param {string} context - a contextual string to qualify the error.
 * @param {mixed} container - the object we're asserting about
 * @param {string} thing - the thing we're asserting exists
 * @throws
 * @return {null} nothing
 */
export const throwExpectation = curry(function _expect(context, container, thing) {
  const found = getOr(false, thing, container)
  if (!found) {
    throw new Error(`Expected to find ${thing} on ${context}.`)
  }
})

/**
 * @function returnExpectation
 * @curried
 * @desc The null-safe version of throwExpectation
 * @param {string} context - a contextual string to qualify the error.
 * @param {mixed} container - the object we're asserting about
 * @param {string} thing - the thing we're asserting exists
 * @return {array} errorKeyValue triplet - [error, key, value]
 */
export const returnExpectation = curry(function _return(context, container, thing) {
  const found = getOr(false, thing, container)
  if (!found) {
    // null-safe
    return [true, thing, context]
  }
  return [false, thing, found]
})

/**
 * Restructure a bunch of [error, key, value] triplets so they are more consumable
 * @function structureErrors
 * @param {object} info - the aggregated object
 * @param {array} triplet - [error, key, value]
 * @return {object} freshInfo
 */
export const structureErrors = (info, triplet) => {
  if (!info) {
    throw new TypeError(`Expected to get a valid object.`)
  }
  if (!triplet || !Array.isArray(triplet) || triplet.length !== 3) {
    throw new TypeError(`Unable to deal with non-triplet array.`)
  }
  const freshInfo = clone(info)
  freshInfo.errors = freshInfo.errors || []
  freshInfo.values = freshInfo.values || []
  freshInfo.hasErrors = freshInfo.hasErrors || false
  const [error, key, value] = triplet
  if (error) {
    freshInfo.errors.push(key)
    freshInfo.hasErrors = true
    freshInfo.context = value
  } else {
    freshInfo.values.push({[key]: value})
  }
  return freshInfo
}

/**
 * A potentially null-safe final step to the the contract function
 * @function signContract
 * @param {boolean} nullSafe - should we throw an error on bad data?
 * @param {info} info - aggregated information
 * @return {object|Error} objectOrThrow
 */
export const signContract = curry(function _signContract(nullSafe, info) {
  if (info && info.hasErrors && !nullSafe) {
    throw new ReferenceError(
      `Unable to access [${info.errors.join(`,`)}] properties on ${info.context}`
    )
  }
  const freshInfo = clone(info)
  if (!freshInfo.values) {
    if (!nullSafe) {
      throw new Error(`Expected to be able to find 'values' on info object.`)
    }
    return {}
  }
  const {values} = freshInfo
  return reduce(merge, {}, values)
})

/**
 * A potentially null-safe form of property checking
 * @function contract
 * @curried
 * @param {boolean} nullSafe - should we throw an error when missing values?
 * @param {string} context - context specific to the call-site, for use if we throw
 * @param {mixed} container - the data we're making an assertion about
 * @param {Array.string} properties - a list of properties to expect
 * @return {object|Error} objectOrThrow
 */
export const contract = curry(function _contract(nullSafe, context, container, properties) {
  return flow(
    // trace(`contract`),
    map(returnExpectation(context, container)),
    // trace(`expectations`),
    reduce(structureErrors, {}),
    // trace(`structuredErrors`),
    signContract(nullSafe)
    // trace(`output`)
  )(properties)
})

/**
 * A partially applied form of contract
 * @function nullSafeContract
 * @partiallyApplies contract
 */
export const nullSafeContract = contract(true)

/**
 * A partially applied form of contract
 * @function errorContract
 * @partiallyApplies contract
 */
export const errorContract = contract(false)

export default throwExpectation
