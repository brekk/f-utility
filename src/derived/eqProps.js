export function makeEqProps({ pipe, map, prop, equals }) {
  return function eqProps(kk, aa, bb) {
    return pipe(map(prop(kk)), ([a2, b2]) => equals(a2, b2))([aa, bb])
  }
}

export default makeEqProps
export const GET_FUNCTION = makeEqProps
export const ARITY = 3
export const SIGNATURE = ["string", "object", "object", "boolean"]
