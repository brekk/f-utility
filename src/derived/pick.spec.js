import exam from "$build/tester"
/* eslint-disable func-style */
exam("pick", F => () => {
  expect(
    F.pick("dope".split(""), { d: 1, o: 1, p: 1, e: 1, c: 3, k: 4, y: 5 })
  ).toEqual({ d: 1, o: 1, p: 1, e: 1 })
  expect(F.pick("dope".split(""), {})).toEqual({})
})
