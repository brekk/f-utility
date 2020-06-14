import memoizeWith from "$core/memoize-with"
const memo = memoizeWith(function basicMemo(x) {
  return x
})
export const union = memo(function unionType(x) {
  return x.split("|")
})
export default union
