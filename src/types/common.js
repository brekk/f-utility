import ofType from "./ofType"
const [
  _isString,
  _isNumber,
  _isUndefined,
  _isFunction,
  _isBoolean,
  _isSymbol,
  _isRawObject
] = [
  "string",
  "number",
  "undefined",
  "function",
  "boolean",
  "symbol",
  "object"
].map(ofType)
export const isString = _isString
export const isNumber = _isNumber
export const isUndefined = _isUndefined
export const isFunction = _isFunction
export const isBoolean = _isBoolean
export const isSymbol = _isSymbol
export const isRawObject = _isRawObject
export const isArray = Array.isArray
