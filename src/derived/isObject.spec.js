import F from "../f-utility"

test("isObject", () => {
  const output = F.map(F.isObject, [
    null,
    undefined,
    false,
    -1,
    1,
    0,
    true,
    "",
    {},
    [],
    /cool/
  ])
  const expected = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true
  ]
  expect(output).toEqual(expected)
})
