export function smash(args) {
  const rawArgs = Array.from(arguments)
  if (!Array.isArray(args) && rawArgs.length) {
    args = rawArgs
  }
  return args.reduce((agg, xx) => Object.assign({}, agg, xx))
}

export default smash
export const FUNCTION = smash
export const ARITY = 1
export const SIGNATURE = ["Array", "any"]
