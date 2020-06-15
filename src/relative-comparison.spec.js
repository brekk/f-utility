import exam from "$build/tester"
exam("lt", F => () => {
  expect(F.lt(200, 100)).toBeTruthy()
  expect(F.lt(100, 200)).toBeFalsy()
  expect(F.lt(200, 200)).toBeFalsy()
})
exam("gt", F => () => {
  expect(F.gt(100, 200)).toBeTruthy()
  expect(F.gt(200, 100)).toBeFalsy()
  expect(F.gt(200, 200)).toBeFalsy()
})
exam("lte", F => () => {
  expect(F.lte(100, 100)).toBeTruthy()
  expect(F.lte(100, 200)).toBeFalsy()
  expect(F.lte(200, 100)).toBeTruthy()
})
exam("gte", F => () => {
  expect(F.gte(100, 100)).toBeTruthy()
  expect(F.gte(200, 100)).toBeFalsy()
  expect(F.gte(100, 200)).toBeTruthy()
})
