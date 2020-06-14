import F from "$build/production"
test("toPairs / fromPairs", () => {
  const input = { a: 1, b: 2, c: 3, d: 4 }
  const output = [
    ["a", 1],
    ["b", 2],
    ["c", 3],
    ["d", 4]
  ]
  expect(F.toPairs(input)).toEqual(output)
  expect(F.fromPairs(output)).toEqual(input)
})
