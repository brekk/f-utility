import exam from "$build/tester"

exam("orDefault", F => () => {
  expect(
    F.map(F.orDefault(42), [
      null,
      undefined,
      false,
      0,
      "",
      {},
      [],
      true,
      "great",
      1233,
      /dope/g
    ])
  ).toEqual([42, 42, false, 0, "", {}, [], true, "great", 1233, /dope/g])
})
