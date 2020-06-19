export function replace(rx, rep, str) {
  return str.replace(rx, rep)
}

export default replace
export const FUNCTION = replace
export const ARITY = 3
export const SIGNATURE = ["RegExp|string", "string", "string", "string"]
