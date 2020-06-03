export function length(xx) {
  return xx && typeof xx === "object" ? Object.keys(xx).length : xx.length
}

export default length
export const FUNCTION = length
export const ARITY = 1
export const SIGNATURE = ["any", "number|nil"]
