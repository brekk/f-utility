import { typeSystem } from "./type-system"

test("typeSystem", () => {
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
      null
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
    "Global∋nil"
  ])
})
