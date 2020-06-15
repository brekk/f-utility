import makeTypechecker from "./makeChecker"
/* eslint-disable-next-line func-style */

test("makeTypechecker", () => {
  expect(() =>
    makeTypechecker(
      z => typeof z,
      x => x
    )(1, 1)
  ).toThrow("makeTypechecker needs two valid lists of types to run")
  const copy = {}
  /* eslint-disable-next-line func-style */
  const saver = ([a, b]) => {
    copy[a.concat(b).join("-")] = [a, b]
    return a.concat(b).join("-")
  }
  expect(
    makeTypechecker(z => typeof z, saver)(["boolean", "boolean"], [true, false])
  ).toEqual({
    failures: false,
    given: [true, false],
    invalid: [],
    params: ["boolean"],
    returnType: "boolean",
    rawParams: [
      {
        actual: "boolean",
        expected: "boolean",
        idx: 0,
        raw: { value: true },
        success: true
      }
    ],
    signature: "boolean -> boolean",
    valid: [
      {
        actual: "boolean",
        expected: "boolean",
        idx: 0,
        raw: { value: true },
        success: true
      }
    ]
  })
  expect(copy).toEqual({
    "boolean-boolean-true-false": [
      ["boolean", "boolean"],
      [true, false]
    ]
  })
})
