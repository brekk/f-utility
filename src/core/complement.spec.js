/* eslint-disable func-style */
import exam from "$build/tester"
exam("complement", F => () => {
  const isEven = x => x % 2 === 0
  const onlyOdd = F.filter(F.complement(isEven))
  expect(onlyOdd([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([1, 3, 5, 7, 9])
})
