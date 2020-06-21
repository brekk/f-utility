import exam from "$build/tester"
/* eslint-disable func-style */
exam("props", F => () => {
  expect(F.props("dope".split(""), { d: 1, o: 2, p: 3, e: 4 })).toEqual([
    1,
    2,
    3,
    4
  ])
})
