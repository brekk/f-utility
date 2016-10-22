import curry from "lodash/fp/curry"
import filter from "lodash/fp/filter"
import flow from "lodash/fp/flow"
import toPairs from "lodash/fp/toPairs"
// import _debug from 'debug'
import {isType} from "../core/validators"
import {mergePairs} from "./merge-pairs"
// const debug = _debug(`f-utility:fp:filter-object`)

/**
 * @namespace util.filterObject
 * @function filterKeysOfObject
 * @curried
 * @param {function} fn - a function which operates on [key, value] pairs
 * @param {object} object
 */
export const filterObject = curry(function _filterKeysOfObjects(
  fn, obj
) {
  if (!isType.fn(fn)) {
    throw new TypeError(`Expected to receive a function.`)
  }
  if (!isType.object(obj) || !obj) {
    throw new TypeError(`Expected to receive an object.`)
  }
  return flow(
    toPairs,
    filter(fn),
    mergePairs
  )(obj)
})
