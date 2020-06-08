import ofType from "./ofType"

test("ofType", () => {
  const whang = {}
  expect(ofType("string")("string")).toBeTruthy()
  expect(ofType("number")(100)).toBeTruthy()
  expect(ofType("boolean")(false)).toBeTruthy()
  expect(ofType("undefined")(whang.zangle)).toBeTruthy()
  expect(ofType("symbol")(Symbol("whangzangle"))).toBeTruthy()
  expect(ofType("object")({})).toBeTruthy()
})
