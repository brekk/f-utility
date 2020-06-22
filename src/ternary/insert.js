export function insert(ind, ins, what) {
  const copy = [].concat(what)
  copy.splice(ind, 0, ins)
  return copy
}
export default insert
export const FUNCTION = insert
export const ARITY = 3
export const SIGNATURE = ["number", "any", "Array", "Array"]
