function makeJ2({ toJSON }) {
  return toJSON(2)
}

export default makeJ2
export const GET_FUNCTION = makeJ2
export const ARITY = 1
export const SIGNATURE = ["any", "string"]
