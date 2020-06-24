export function makeOrDefault({ curryN }) {
  return curryN(ARITY, function orDefault(def, given) {
    return given || def
  })
}

export default makeOrDefault
export const GET_FUNCTION = makeOrDefault
export const ARITY = 2
export const SIGNATURE = ["any", "any", "any"]
