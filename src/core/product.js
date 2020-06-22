export function product(arr) {
  return arr.reduce(function multiplying(count, x) {
    return count * x
  }, 1)
}

export default product
export const FUNCTION = product
export const ARITY = 1
export const SIGNATURE = ["Array", "number"]
