export function makeProps({ pipe, ap, prop, box, map, curryN }) {
  return curryN(ARITY, function props(toGrab, xx) {
    return pipe(box, ap(map(prop, toGrab)))(xx)
  })
}
export default makeProps
export const GET_FUNCTION = makeProps
export const ARITY = 2
export const SIGNATURE = ["Array", "object", "Array"]
