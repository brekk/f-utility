export const isArray = Array.isArray
export const keys = Object.keys
export const freeze = Object.freeze

export function mash(a, b) {
  return Object.assign({}, a, b)
}
export function jam(a, b) {
  return mash(b, a)
}
export function temper(a, b) {
  return freeze(mash(a, b))
}
