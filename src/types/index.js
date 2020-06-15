export {
  isNil,
  isString,
  isNumber,
  isUndefined,
  isFunction,
  isBoolean,
  isSymbol,
  isRawObject,
  isArray
} from "./common"
export { archetype } from "./archetype"
export { makeTypechecker } from "./makeChecker"
export { compareTypes } from "./compare"
export { isUnmatched } from "./isUnmatched"
export { ofConstructor as is } from "./ofConstructor"
export { ofType } from "./ofType"
export { system as typeSystem } from "./system"
export { checkParamsWith } from "./check-params"
export { checkReturnWith } from "./check-return"
