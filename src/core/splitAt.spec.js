import exam from "$build/tester"
/* eslint-disable func-style */
exam("splitAt", F => () => {
  expect(F.splitAt(6, "bananasplit")).toEqual(["banana", "split"])
})
