import exam from "$build/tester"
/* eslint-disable func-style */
exam("nthArg", F => () => {
  expect(F.nthArg(4)("a", "b", "c", "d", "e")).toEqual("e")
})
