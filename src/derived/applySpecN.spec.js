import exam from "$build/tester"

exam("applySpecN", F => () => {
  const apObj = F.applySpecN(2, {
    sum: F.add,
    cool: { dope: { yes: F.multiply } }
  })
  expect(apObj(10, 50)).toEqual({ sum: 60, cool: { dope: { yes: 500 } } })
})
