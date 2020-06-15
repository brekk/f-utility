import exam from "$build/tester"
exam("range", F => () => {
  expect(F.range(0, 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  expect(F.range(10, 0)).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
  expect(F.range(0, -10)).toEqual([0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10])
  expect(F.range(-5, 5)).toEqual([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5])
})
