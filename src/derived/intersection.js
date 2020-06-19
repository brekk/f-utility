export function makeIntersection({ uniq, concat, curryN }) {
  return curryN(ARITY, function intersection(aa, bb) {
    return uniq(concat(aa, bb))
  })
}

export default makeIntersection
export const GET_FUNCTION = makeIntersection
export const ARITY = 2
export const SIGNATURE = ["Array", "Array", "Array"]
