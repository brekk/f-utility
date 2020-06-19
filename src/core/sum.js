export function sum(arr) {
  return arr.reduce(function adding(count, x) {
    return count + x
  }, 0)
}

export default sum
export const FUNCTION = sum
export const ARITY = 1
export const SIGNATURE = ["Array", "number"]
