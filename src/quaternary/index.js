import { FUNCTION as ifElse } from "./ifElse"

export function extendQuaternary(F) {
  return F.temper(F, {
    ifElse
  })
}

export default extendQuaternary
