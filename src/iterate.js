import {curry} from 'katsu-curry'

/**
 * call a function x times and aggregate the result
 * @method iterate
 * @param {number} total - a total number of iterations
 * @param {function} fn - a function to invoke x times
 * @returns {Array} aggregated values from invoking a given function
 * @public
 */
export const iterate = curry((total, fn) => {
  let count = total
  const agg = []
  if (typeof fn !== `function` || typeof count !== `number`) {
    return agg
  }
  let last = null
  while (count > 0) {
    count--
    last = fn()
    agg.push(last)
  }
  return agg
})
