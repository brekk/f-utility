function split(del, xx) {
  return xx.split(del)
}

export const FUNCTION = split
export const ARITY = 2
export const SIGNATURE = ["string", "string", "array"]
