function makeReject({ curryN, filter, complement }) {
  return curryN(ARITY, function reject(fn, xx) {
    return filter(complement(fn), xx)
  })
}

export default makeReject
export const GET_FUNCTION = makeReject
export const ARITY = 2
export const SIGNATURE = ["function", "Array|object", "Array|object"]
