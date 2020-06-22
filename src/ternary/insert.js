export function insert(ind, ins, what) {
  return [].concat(what.slice(0, ind), ins, what.slice(ind, Infinity))
}
export default insert
export const FUNCTION = insert
export const ARITY = 3
export const SIGNATURE = ["number", "any", "Array"]
