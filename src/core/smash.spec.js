import F from "$build/production"

test("smash", () => {
  expect(F.smash([{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }])).toEqual({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  })
})

test("smash - variadic", () => {
  expect(F.smash({ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 })).toEqual({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  })
})
