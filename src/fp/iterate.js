import rangeFinder from 'lodash/fp/range'
import curry from 'lodash/fp/curry'
import map from 'lodash/fp/map'
import flow from 'lodash/fp/flow'

export const ERROR_CODES = {
  expectInteger: `Expected to be given integer howMany.`,
  callbackAintNoFunction: `Expected to be given function callback.`
}

/**
 * invoke a function x times and return the results
 * @function iterate
 * @param {integer} howMany - how many iterations this shall be invoked
 * @param {function} cb - function to invoke howMany times
 * @return {Array} mapped results
 */
export const iterate = curry(function _iterate(howMany, cb) {
  if (typeof howMany !== `number` || Math.round(howMany) !== howMany) {
    throw new TypeError(ERROR_CODES.expectInteger)
  }
  if (typeof cb !== `function`) {
    throw new TypeError(ERROR_CODES.callbackAintNoFunction)
  }
  return flow(
    rangeFinder(0),
    map(cb)
  )(Math.abs(howMany))
})
