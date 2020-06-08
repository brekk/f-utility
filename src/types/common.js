import ofConstructor from "./ofConstructor"
import ofType from "./ofType"
const [
  _isString,
  _isNumber,
  _isFunction,
  _isBoolean,
  _isSymbol,
  _isRawObject
] = [String, Number, Function, Boolean, Symbol, Object].map(ofConstructor)
export const isUndefined = ofType("undefined")
export const isString = _isString
export const isNumber = _isNumber
export const isFunction = _isFunction
export const isBoolean = _isBoolean
export const isSymbol = _isSymbol
export const isRawObject = _isRawObject
export const isArray = Array.isArray
