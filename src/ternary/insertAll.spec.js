import exam from "$build/tester"

exam("insertAll", F => () => {
  expect(F.insertAll(2, "x", [1, 2, 3, 4])).toEqual([1, 2, "x", 3, 4])
  expect(F.insertAll(2, "xyz".split(""), [1, 2, 3, 4])).toEqual([
    1,
    2,
    "x",
    "y",
    "z",
    3,
    4
  ])
})
