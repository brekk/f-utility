export function prepend(whatever, xx) {
  const copy = [].concat(xx)
  copy.splice(0, 0, whatever)
  return copy
}

export default prepend

export const FUNCTION = prepend
export const ARITY = 2
export const SIGNATURE = ["any", "Array", "Array"]
