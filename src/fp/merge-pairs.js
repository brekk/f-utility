import reduce from "ramda/src/reduce"
import cloneDeep from "ramda/src/clone"

/**
 * @namespace util.mergePairs
 * @function mergePairs
 * @curried
 * @param {array} keyPairs - an array of [key, value] pairs
 * @return {object} a reduced object which is the merged version of {[key]: value}
 */
export const mergePairs = reduce(function _mergePairs(structure, pair) {
  const [key, value] = pair
  const copy = cloneDeep(structure)
  copy[key] = value
  return copy
}, {})
