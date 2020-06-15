export function mode(arr) {
  const keymap = {}
  let idx = 0
  let out = -1
  let outIdx = -1
  while (idx < arr.length) {
    const value = arr[idx]
    if (!keymap[value]) keymap[value] = 0
    keymap[value] += 1
    idx += 1
  }
  idx = 0
  const keykey = Object.keys(keymap)
  while (idx < keykey.length) {
    const value = keymap[keykey[idx]]
    if (value > out) {
      out = value
      outIdx = keykey[idx]
    }
    idx += 1
  }
  const parsed = parseInt(outIdx)
  return isNaN(parsed) ? outIdx : parsed
}

export default mode
export const FUNCTION = mode
export const ARITY = 1
export const SIGNATURE = ["Array", "any"]
