export function splitAt(idx, xx) {
  return [xx.slice(0, idx), xx.slice(idx + 1, Infinity)]
}
export default splitAt
export const FUNCTION = splitAt
export const ARITY = 2
export const SIGNATURE = ["number", "Array|string", "Array|string"]
