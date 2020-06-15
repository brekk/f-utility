export function toPairs(oo) {
  return Object.keys(oo).map(function enpair(ky) {
    return [ky, oo[ky]]
  })
}

export default toPairs
export const FUNCTION = toPairs
export const ARITY = 1
export const SIGNATURE = ["object", "Array"]
