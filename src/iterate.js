import {curry} from 'katsu-curry'

export const __iterate = (total, fn) => {
  let count = total
  const agg = []
  if (typeof fn !== `function` || typeof count !== `number`) {
    return agg
  }
  while (count > 0) {
    count--
    agg.push(fn())
  }
  return agg
}
/**
 * call a function x times and aggregate the result
 * @method iterate
 * @param {number} total - a total number of iterations
 * @param {function} fn - a function to invoke x times
 * @returns {Array} aggregated values from invoking a given function
 * @public
 * @example
 * import {iterate} from 'f-utility'
 * iterate(5, () => `x`) // [`x`, `x`, `x`, `x`, `x`]
 */
export const iterate = curry(__iterate)
