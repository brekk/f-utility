import exam from "$build/tester"

exam("invertObj", F => () => {
  expect(F.invertObj({ a: 1, b: 2, c: 3, d: 4, e: 4, f: 4 })).toEqual({
    1: "a",
    2: "b",
    3: "c",
    4: "f"
  })
})
