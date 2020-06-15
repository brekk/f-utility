export function smash(args) {
  return args.reduce((agg, xx) => Object.assign({}, agg, xx), {})
}

export default smash
export const FUNCTION = smash
export const ARITY = 1
export const SIGNATURE = ["Array", "object"]
