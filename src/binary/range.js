function range(aa, zz) {
  const out = []
  const down = zz < aa
  for (let ix = aa; down ? ix >= zz : ix <= zz; down ? ix-- : ix++) {
    out.push(ix)
  }
  return out
}

export const FUNCTION = range
export const ARITY = 2
export const SIGNATURE = ['number', 'number', 'array']
