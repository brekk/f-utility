import F from "../build/f-utility"
/* eslint-disable func-style */
test("apply", () => {
  expect(F.apply(Math.max, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1])).toEqual(10)
})

/* eslint-enable func-style */
