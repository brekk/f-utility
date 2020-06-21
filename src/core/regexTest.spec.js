import exam from "$build/tester"
/* eslint-disable func-style */
exam("test", F => () => {
  expect(F.test(/a/g, "banana")).toBeTruthy()
})
