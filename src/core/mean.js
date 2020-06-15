export function mean(arr) {
  let idx = 0
  let sum = 0
  while (idx < arr.length) {
    sum += arr[idx]
    idx += 1
  }
  return sum / arr.length
}
export default mean
export const FUNCTION = mean
export const ARITY = 1
export const SIGNATURE = ["Array", "number"]
