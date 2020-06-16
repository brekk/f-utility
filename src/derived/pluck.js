export function makePluck({ curryN, map, prop }) {
  return curryN(ARITY, function pluck(kk, xs) {
    return map(prop(kk), xs)
  })
}
export default makePluck
export const GET_FUNCTION = makePluck
export const ARITY = 2
export const SIGNATURE = ["string", "Array|object", "Array|object"]
