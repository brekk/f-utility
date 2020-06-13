import F from "../build/f-utility"

test("flatten", () => {
  const input = [1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]
  expect(F.flatten(input)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
})
