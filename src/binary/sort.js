function sort(fn, rr) {
  const copy = [].concat(rr)
  copy.sort(fn)
  return copy
}

export const FUNCTION = sort
export const ARITY = 2
export const SIGNATURE = ["function", "Array", "Array"]
