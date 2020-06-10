export function call(args) {
  return args[0].apply(null, args.slice(1))
}

export default call
export const FUNCTION = call
export const ARITY = 1
export const SIGNATURE = ["Array", "any"]
