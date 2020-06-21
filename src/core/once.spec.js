import exam from "$build/tester"
/* eslint-disable func-style */
exam("once", F => () => {
  let count = 0
  const myLeakyFunction = F.once(() => {
    count += 1
    return count
  })
  expect(myLeakyFunction()).toEqual(1)
  expect(myLeakyFunction()).toEqual(1)
  expect(myLeakyFunction()).toEqual(1)
})
