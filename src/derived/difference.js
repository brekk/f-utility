function makeDifference({ curryN, filter, flip, includes, complement }) {
  return curryN(ARITY, function difference(aa, bb) {
    return filter(complement(flip(includes)(bb)), aa)
  })
}

export default makeDifference
export const GET_FUNCTION = makeDifference
export const ARITY = 2
export const SIGNATURE = ["Array", "Array", "Array"]
