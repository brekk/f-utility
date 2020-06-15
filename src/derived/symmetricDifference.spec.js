import R from "ramda"

import exam from "$build/tester"
exam("symmetricDifference", F => () => {
  expect(F.symmetricDifference(F.keys(F), F.keys(R))).toEqual(
    R.symmetricDifference(R.keys(F), R.keys(R))
  )
  expect(F.symmetricDifference([1, 2, 3], [4, 5, 6])).toEqual([
    1,
    2,
    3,
    4,
    5,
    6
  ])
  expect(F.symmetricDifference([1, 2, 3, 4], [4, 5, 6])).toEqual([
    1,
    2,
    3,
    5,
    6
  ])
  expect(F.symmetricDifference([], [1, 2, 3])).toEqual([1, 2, 3])
  expect(F.symmetricDifference([1, 2, 3], [])).toEqual([1, 2, 3])
  expect(F.symmetricDifference([1, 2, 3], [1, 2, 3])).toEqual([])
  expect(F.symmetricDifference([1, 2, 3, 4, 5], [1, 2, 3])).toEqual([4, 5])
})
