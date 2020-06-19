export function makeOmit({ complement, pickBy, includes }) {
  return function omit(kk, xx) {
    return pickBy(complement(includes)(kk), xx)
  }
}

export default makeOmit
export const GET_FUNCTION = makeOmit
export const ARITY = 2
export const SIGNATURE = ["Array", "object", "object"]
