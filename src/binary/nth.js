function nth(ix, xx) {
  return ix < 0 && xx.length + ix ? xx[xx.length + ix] : xx[ix]
}

export const FUNCTION = nth
export const ARITY = 2
export const SIGNATURE = ["number", "array", "any"]
