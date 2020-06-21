export function makeGroupBy({ reduce, mash, objOf, curryN }) {
  return curryN(ARITY, function groupBy(fn, xx) {
    return reduce(function groupingBy(agg, yy) {
      const copy = mash({}, agg)
      const key = fn(yy)
      if (copy[key]) {
        copy[key] = copy[key].concat(yy)
        return copy
      }
      const toMash = objOf(key, [yy])
      return mash(copy, toMash)
    }, {})(xx)
  })
}

export default makeGroupBy
export const GET_FUNCTION = makeGroupBy
export const ARITY = 2
export const SIGNATURE = ["function", "Array", "object"]
