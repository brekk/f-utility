function makePathOr({ curryN, reduce }) {
  return curryN(ARITY, function pathOr(dd, ks, src) {
    return reduce(
      function walkPathOr(agg, st) {
        return (agg && agg[st]) || dd
      },
      src,
      ks
    )
  })
}

export default makePathOr
export const GET_FUNCTION = makePathOr
export const ARITY = 3
export const SIGNATURE = ["any", "Array", "any", "any"]
