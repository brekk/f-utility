import exam from "$build/tester"
/* eslint-disable func-style */
exam("move", F => () => {
  expect(F.move(0, 2, "abcdef".split(""))).toEqual([
    "b",
    "c",
    "a",
    "d",
    "e",
    "f"
  ])
  expect(F.move(0, 1000, "abcdef".split(""))).toEqual("abcdef".split(""))
  expect(F.move(-1, 0, "abcdef".split(""))).toEqual("fabcde".split(""))
})
