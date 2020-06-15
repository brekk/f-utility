import exam from "$build/tester"
exam("anyPass", F => () => {
  const matches = F.anyPass([x => x > 90, x => x < 70])
  expect(matches([71, 79, 81, 89])).toBeFalsy()
  expect(matches([60, 71, 79, 81, 89])).toBeTruthy()
  expect(matches([71, 79, 81, 89, 95])).toBeTruthy()
})
