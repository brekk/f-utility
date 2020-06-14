import F from "$build/production"
/* eslint-disable func-style */
test("ifElse", () => {
  const yes = x => x * 2
  const no = y => y / 2
  expect(F.ifElse(z => z % 2 === 0, yes, no)(100)).toEqual(200)
  expect(F.ifElse(z => z % 2 === 0, yes, no)(101)).toEqual(50.5)
})

/* eslint-enable func-style */
