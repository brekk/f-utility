import { FUNCTION as ifElse } from "./ifElse"

export function extendQuaternary(F) {
  return F.weld(F, {
    ifElse
  })
}

export default extendQuaternary
