import exam from "$build/tester"
/* eslint-disable func-style */
exam("isEmpty", F => () => {
  expect(
    [undefined, "no", { no: true }, ["no"], {}, "", []].map(F.isEmpty)
  ).toEqual([false, false, false, false, true, true, true])
})
