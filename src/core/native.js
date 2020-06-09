export const isArray = Array.isArray
export const keys = Object.keys
export const freeze = Object.freeze

export function mash(a, b) {
  return Object.assign({}, a, b)
}
export function jam(a, b) {
  return mash(b, a)
}
export function smash(args) {
  const rawArgs = Array.from(arguments)
  if (!Array.isArray(args) && rawArgs.length) {
    args = rawArgs
  }
  return args.reduce((agg, xx) => mash(agg, xx))
}
export function temper(a, b) {
  return freeze(mash(a, b))
}
export function apply(fn, args) {
  return fn.apply(null, args)
}
export function call(args) {
  return args[0].apply(null, args.slice(1))
}
export const max = Math.max
export const min = Math.min
export const round = Math.round

