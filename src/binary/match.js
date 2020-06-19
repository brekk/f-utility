export function match(rx, str) {
  return str.match(rx)
}

export default match
export const FUNCTION = match
export const ARITY = 2
export const SIGNATURE = ["RegExp", "string", "boolean"]
