import exam from "$build/tester"
exam("propOr / prop / propEq / propSatisfies", F => () => {
  expect(F.propOr("?", "abc", { abc: 100 })).toEqual(100)
  expect(F.propOr("?", "abc", { ac: 100 })).toEqual("?")
  expect(F.prop("abc", { abc: 100 })).toEqual(100)
  expect(F.propEq("abc", 100, { abc: 100 })).toBeTruthy()
  expect(F.propEq("abc", 100, { boring: true })).toBeFalsy()
  expect(F.propSatisfies(x => x % 2 === 0, "abc", { abc: 500 })).toBeTruthy()
  expect(F.propSatisfies(x => x % 2 === 0, "abc", { abc: 123 })).toBeFalsy()
})

exam("pathOr and more", F => () => {
  const fixture = {
    a: { alpha: { anemone: { aardvark: 1000 } } },
    b: { beta: { badger: { bat: 5010 } } }
  }
  expect(F.pathOr("???", ["a", "b", "c"], fixture)).toEqual("???")
  expect(
    F.pathOr("???", ["a", "alpha", "anemone", "aardvark"], fixture)
  ).toEqual(fixture.a.alpha.anemone.aardvark)
  expect(
    F.pathEq(["a", "alpha", "anemone", "aardvark"], 1000, fixture)
  ).toBeTruthy()
  expect(
    F.pathEq(["a", "alpha", "anemone", "aardvark"], "nope", fixture)
  ).toBeFalsy()
  expect(
    F.pathSatisfies(
      x => x === 1000,
      ["a", "alpha", "anemone", "aardvark"],
      fixture
    )
  ).toBeTruthy()
  expect(
    F.pathSatisfies(x => x === 1000, ["a", "alpha", "anemone", "xxxx"], fixture)
  ).toBeFalsy()
})
