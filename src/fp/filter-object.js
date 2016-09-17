import curry from "lodash/fp/curry"
import filter from "lodash/fp/filter"
import flow from "lodash/fp/flow"
import toPairs from "lodash/fp/toPairs"
import {isType} from "../core/validators"
import mergePairs from "./merge-pairs"

/**
 * @namespace util.filterObject
 * @function filterKeysOfObject
 * @curried
 * @param {function} fn - a function which operates on [key, value] pairs
 * @param {object} object
 */
export const filterKeysOfObject = curry(function _filterKeysOfObjects(
  fn, obj
) {
  if (!isType.fn(fn)) {
    throw new TypeError(`Expected to receive a function.`)
  }
  if (!isType.object(obj)) {
    throw new TypeError(`Expected to receive an object.`)
  }
  return flow(
    toPairs,
    filter(fn),
    mergePairs
  )(obj)
})
