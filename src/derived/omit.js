export function makeOmit({ curryN, complement, pickBy, includes }) {
  return curryN(ARITY, function omit(kk, xx) {
    return pickBy(complement(includes)(kk), xx)
  })
}

export default makeOmit
export const GET_FUNCTION = makeOmit
export const ARITY = 2
export const SIGNATURE = ["Array", "object", "object"]
