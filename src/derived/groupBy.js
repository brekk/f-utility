export function makeGroupBy({ reduce, mash, objOf, curryN }) {
  return curryN(ARITY, function groupBy(fn, xx) {
    return reduce(function groupingBy(agg, yy) {
      return mash(agg, objOf(fn(yy), yy)), {}
    })(xx)
  })
}

export default makeGroupBy
export const GET_FUNCTION = makeGroupBy
export const ARITY = 2
export const SIGNATURE = ["function", "array", "object"]
