export function assoc(key, toSet, xx) {
  return Object.assign({}, xx, { [key]: toSet })
}

export default assoc
export const FUNCTION = assoc
export const ARITY = 3
export const SIGNATURE = ["any", "string|number", "object", "object"]
