function toJSON(indent, x) {
  return JSON.stringify(x, null, indent)
}
export const FUNCTION = toJSON
export const ARITY = 2
export const SIGNATURE = ["number", "any", "string"]
