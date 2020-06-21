import exam from "$build/tester"
/* eslint-disable func-style */
exam("repeat", F => () => {
  expect("b" + F.repeat(2, "an") + "a").toEqual("banana")
})
