import exam from "$build/tester"
/* eslint-disable func-style */
exam("juxt", F => () => {
  const input = F.range(0, 10)
  expect(F.juxt([Math.min, Math.max]).apply(null, input)).toEqual([0, 10])
})
