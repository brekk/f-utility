import exam from "$build/tester"

exam("pluck", F => () => {
  expect(
    F.pluck("key", [
      { key: "b" },
      { key: "a" },
      { key: "n" },
      { key: "a" },
      { key: "n" },
      { key: "a" }
    ])
  ).toEqual("banana".split(""))
})
