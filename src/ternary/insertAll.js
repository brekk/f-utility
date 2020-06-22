export function insertAll(ind, ins, what) {
  return [].concat(
    // one
    what.slice(0, ind),
    // two
    ins,
    // three
    what.slice(ind, Infinity)
  )
}
export default insertAll
export const FUNCTION = insertAll
export const ARITY = 3
export const SIGNATURE = ["number", "any", "Array", "Array"]
