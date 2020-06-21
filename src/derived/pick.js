export function makePick({ pickBy, includes, curryN }) {
  return curryN(ARITY, function pick(kk, xx) {
    return pickBy((v, k) => includes(k, kk), xx)
  })
}

export default makePick
export const GET_FUNCTION = makePick
export const ARITY = 2
export const SIGNATURE = ["Array", "object", "object"]
