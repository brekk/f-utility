import exam from "$build/tester"
exam("smash", F => () => {
  expect(F.smash([{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }])).toEqual({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  })
})
