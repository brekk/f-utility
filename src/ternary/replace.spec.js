import exam from "$build/tester"

exam("replace", F => () => {
  const fun = F.replace(/a/g, "ay")
  expect(fun("banana")).toEqual("baynaynay")
})
