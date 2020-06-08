function sort(fn, rr) {
  return [].concat(rr).sort(fn)
}

export const FUNCTION = sort
export const ARITY = 2
export const SIGNATURE = ["function", "Array", "Array"]
