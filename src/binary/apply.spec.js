import exam from "$build/tester"
/* eslint-disable func-style */
exam("apply", F => () => {
  expect(F.apply(Math.max, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1])).toEqual(10)
})

/* eslint-enable func-style */
