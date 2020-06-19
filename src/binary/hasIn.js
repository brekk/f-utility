export function hasIn(pp, xx) {
  return pp in xx
}

export default hasIn
export const FUNCTION = hasIn
export const ARITY = 2
export const SIGNATURE = ["string", "object", "boolean"]
