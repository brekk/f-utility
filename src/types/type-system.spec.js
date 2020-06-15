import {
  isNil,
  isUnmatched,
  typeSystem,
  checkReturnWith,
  checkParamsWith,
  compareTypes,
  archetype
} from "$types/index"
import C from "$core/constants"
import PREFERRED_TYPE from "$types/archetypes"
const { UNMATCHED } = C
test("isNil", () => {
  expect([null, undefined, false, true, "neil", "nail"].map(isNil)).toEqual([
    true,
    true,
    false,
    false,
    false,
    false
  ])
})
test("PREFERRED_TYPE", () => {
  expect(PREFERRED_TYPE).toEqual({
    boolean: "Boolean∋boolean",
    function: "Function∋function",
    number: "Number∋number",
    object: "Object∋object",
    string: "String∋string",
    undefined: "Global∋nil",
    symbol: "Symbol∋symbol",
    nil: "Global∋nil"
  })
})
test("archetype", () => {
  expect(
    [
      "nil",
      "undefined",
      "boolean",
      "number",
      "symbol",
      "object",
      "Array|object"
    ].map(archetype)
  ).toEqual([
    "Global∋nil",
    "Global∋nil",
    "Boolean∋boolean",
    "Number∋number",
    "Symbol∋symbol",
    "Object∋object",
    ["Array∋object", "Object∋object"]
  ])
})
test("checkReturnWith", () => {
  // const fun = (a, b, c) => '' + a + b + c
  const given = "123"
  const hm = ["number", "number", "number", "string"]
  const args = [1, 2, 3]
  expect(checkReturnWith(typeSystem)(given)(hm, args)).toBeTruthy()
  expect(checkReturnWith(typeSystem)(123)(hm, args)).toBeFalsy()
  expect(checkReturnWith(typeSystem)(true)(hm, args)).toBeFalsy()
})
test("checkReturnWith - union type", () => {
  // const fun = (a, b, c) => '' + a + b + c
  const hm = ["number", "number", "number", "string|number"]
  const args = [1, 2, 3]
  expect(checkReturnWith(typeSystem)(123)(hm, args)).toBeTruthy()
  expect(checkReturnWith(typeSystem)("string")(hm, args)).toBeTruthy()
})
test("checkParamsWith", () => {
  const hm = ["number", "object", "boolean", "string", "symbol", "any"]
  expect(
    checkParamsWith(typeSystem)(hm, [1, {}, true, "yes", Symbol("cool")])
  ).toBeTruthy()
})
test("checkParamsWith - union type", () => {
  const hm = [
    "number|string",
    "object|string",
    "boolean",
    "string",
    "symbol",
    "any"
  ]
  expect(
    checkParamsWith(typeSystem)(hm, [1, {}, true, "yes", Symbol("cool")])
  ).toBeTruthy()
  expect(
    checkParamsWith(typeSystem)(hm, ["string", {}, true, "yes", Symbol("cool")])
  ).toBeTruthy()

  expect(
    checkParamsWith(typeSystem)(hm, [
      "string",
      "string",
      true,
      "yes",
      Symbol("cool")
    ])
  ).toBeTruthy()
})

test("compareTypes", () => {
  expect(compareTypes("any", "whatever")).toBeTruthy()
  expect(compareTypes("whatever", "any")).toBeTruthy()
  expect(compareTypes("String∋string", "string")).toBeTruthy()
  expect(compareTypes("string", "String∋string")).toBeTruthy()
  expect(compareTypes("xxx", "xxx")).toBeTruthy()
})
/*
test("defaultMemoizer", () => {
  expect(defaultMemoizer()).toEqual()
})
test("is", () => {
  expect(is()).toEqual()
})
test("isArray", () => {
  expect(isArray()).toEqual()
})
test("isBoolean", () => {
  expect(isBoolean()).toEqual()
})
test("isFunction", () => {
  expect(isFunction()).toEqual()
})
test("isNumber", () => {
  expect(isNumber()).toEqual()
})
test("isRawObject", () => {
  expect(isRawObject()).toEqual()
})
test("isString", () => {
  expect(isString()).toEqual()
})
test("isSymbol", () => {
  expect(isSymbol()).toEqual()
})
test("isType", () => {
  expect(isType()).toEqual()
})
test("isUndefined", () => {
  expect(isUndefined()).toEqual()
})
test("isUnmatched", () => {
  expect(isUnmatched()).toEqual()
})
test("makeTypechecker", () => {
  expect(makeTypechecker()).toEqual()
})
test("preferredType", () => {
  expect(preferredType()).toEqual()
})
test("separateUnionTypes", () => {
  expect(separateUnionTypes()).toEqual()
})
test("typeChild", () => {
  expect(typeChild()).toEqual()
})
test("typeParent", () => {
  expect(typeParent()).toEqual()
})
*/
test("typeSystem", () => {
  function ClassesAreGross(x) {
    this.name = x
    return this
  }
  expect(
    [
      "this is a string",
      100,
      false,
      true,
      /cool/,
      { objects: { have: { stuff: true } } },
      [1, 2, 3],
      Symbol("cool"),
      undefined,
      null,
      new ClassesAreGross("cool")
    ].map(typeSystem)
  ).toEqual([
    "String∋string",
    "Number∋number",
    "Boolean∋boolean",
    "Boolean∋boolean",
    "RegExp∋object",
    "Object∋object",
    "Array∋object",
    "Symbol∋symbol",
    "Global∋nil",
    "Global∋nil",
    "ClassesAreGross∋object"
  ])
})

test("isUnmatched", () => {
  expect(isUnmatched(UNMATCHED)).toBeTruthy()
})
