export function objOf(xx, whatever) {
  return { [xx]: whatever }
}
export default objOf
export const FUNCTION = objOf
export const ARITY = 2
export const SIGNATURE = ["string|symbol|number", "any", "object"]
