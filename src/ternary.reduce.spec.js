import exam from "$build/tester"

exam("reduce", ({ reduce }) => () => {
  expect(
    reduce((agg, x) => agg + x, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  ).toEqual(1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9)
})
