import exam from "$build/tester"
exam("cond", F => () => {
  const celsius = F.cond([
    [z => z === 0, () => "freeze"],
    [z => z === 100, () => "boil"],
    [F.T, () => "nothing"]
  ])
  expect(celsius(100)).toEqual("boil")
  expect(celsius(0)).toEqual("freeze")
  expect(celsius(1 + Math.random() * 98)).toEqual("nothing")
})

exam("T / F", F => () => {
  expect(F.T()).toBeTruthy()
  expect(F.F()).toBeTruthy()
})
