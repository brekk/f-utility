function makeAnyPass({ curryN, pipe, map, flip, any, smooth, length, gt }) {
  return curryN(ARITY, function anyPass(preds, xx) {
    return pipe(
      map(flip(any)(xx)),
      smooth,
      length,
      gt(0)
    )(preds)
  })
}

export default makeAnyPass
export const GET_FUNCTION = makeAnyPass
export const ARITY = 2
export const SIGNATURE = ["Array", "any", "boolean"]
