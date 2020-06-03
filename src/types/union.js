import memoizeWith from "../memoize-with"
const memo = memoizeWith(function identity(x) {
  return x
})
export const union = memo(function unionType(x) {
  return x.split("|")
})
export default union
