export function move(_aa, _zz, arr) {
  const len = arr.length
  const copy = arr.slice()
  function wrap(q) {
    return q < 0 ? len + q : q
  }
  function outOfBounds(s) {
    return s < 0 || s >= len
  }
  const [aa, zz] = [_aa, _zz].map(wrap)
  const item = copy.splice(aa, 1)
  return outOfBounds(aa) || outOfBounds(zz)
    ? arr
    : []
        .concat(copy.slice(0, zz))
        .concat(item)
        .concat(copy.slice(zz, arr.length))
}
export default move
export const FUNCTION = move
export const ARITY = 3
export const SIGNATURE = ["number", "number", "Array", "Array"]
