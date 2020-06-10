function makeUnion({ uniq, curryN, pipe, concat }) {
  return curryN(ARITY, function union(aa, bb) {
    return pipe(
      concat(bb),
      uniq
    )(aa)
  })
}

export default makeUnion
export const GET_FUNCTION = makeUnion
export const ARITY = 2
export const SIGNATURE = ["Array", "Array", "Array"]
