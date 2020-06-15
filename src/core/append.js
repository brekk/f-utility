export function append(whatever, xx) {
  const copy = [].concat(xx)
  copy.splice(copy.length, 0, whatever)
  return copy
}

export default append

export const FUNCTION = append
export const ARITY = 2
export const SIGNATURE = ["any", "Array", "Array"]
