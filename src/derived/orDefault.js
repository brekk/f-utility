export function makeOrDefault({ curryN, isNil, isUnmatched }) {
  return curryN(ARITY, function orDefault(def, given) {
    return isNil(given) || isUnmatched(given) ? def : given
  })
}

export default makeOrDefault
export const GET_FUNCTION = makeOrDefault
export const ARITY = 2
export const SIGNATURE = ["any", "any", "any"]
