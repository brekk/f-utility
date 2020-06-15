export function makeMedian({ $, dec, pipe, length, nth, sort, divide }) {
  return pipe(
    sort((a, b) => a - b),
    xx => pipe(length, dec, divide(2), Math.round, nth($, xx))(xx)
  )
}
export default makeMedian
export const GET_FUNCTION = makeMedian
export const ARITY = 1
export const SIGNATURE = ["Array", "number"]
