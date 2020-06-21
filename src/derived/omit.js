export function makeOmit({ curryN, pickBy, includes }) {
  return curryN(ARITY, function omit(kk, xx) {
    return pickBy((v, k) => !includes(k, kk), xx)
  })
}

export default makeOmit
export const GET_FUNCTION = makeOmit
export const ARITY = 2
export const SIGNATURE = ["Array", "object", "object"]
