export function has(pp, xx) {
  return xx && typeof xx[pp] !== "undefined"
}

export default has
export const FUNCTION = has
export const ARITY = 2
export const SIGNATURE = ["string", "object", "boolean"]
