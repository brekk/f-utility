import exam from "$build/tester"
/* eslint-disable func-style */
exam("objOf", F => () => {
  expect(F.objOf("cool", "shit")).toEqual({ cool: "shit" })
})
