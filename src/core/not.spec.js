import exam from "$build/tester"

exam("not", F => () => {
  expect([true, false, [], {}, null, "red", 3].map(F.not)).toEqual([
    false,
    true,
    false,
    false,
    true,
    false,
    false
  ])
})
