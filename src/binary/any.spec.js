import exam from "$build/tester"
/* eslint-disable func-style */
exam("any", F => () => {
  const even = x => x % 2 === 0
  const eves = F.any(even)([1, 2, 3])
  expect(eves).toBeTruthy()
  expect(F.any(even)([1, 3])).toBeFalsy()
})
