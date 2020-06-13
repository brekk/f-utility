import F from "../build/f-utility"
/* eslint-disable func-style */
const RAW_DATA = {
  a: {
    c: { d: 1, e: 2 },
    f: [1, 2, 3]
  },
  b: {
    g: { h: false },
    i: true
  },
  j: Math.round(Math.random() * 1e3)
}
test("path", () => {
  expect(F.path(["a", "c", "d"], RAW_DATA)).toEqual(RAW_DATA.a.c.d)
  expect(F.path(["a", "c", "whatever"], RAW_DATA)).toBeFalsy()
})
test("pathEq", () => {
  expect(F.pathEq(["a", "c", "d"], 1, RAW_DATA)).toBeTruthy()
  expect(F.pathEq(["a", "c", "d"], "whatever", RAW_DATA)).toBeFalsy()
})
test("pathSatisfies", () => {
  expect(F.pathSatisfies(z => z[2] === 3, ["a", "f"], RAW_DATA)).toBeTruthy()
  expect(F.pathSatisfies(z => z.h === false, ["b", "g"], RAW_DATA)).toBeTruthy()
})
test("pathIs", () => {
  expect(F.pathIs(Boolean, ["b", "i"], RAW_DATA)).toBeTruthy()
  expect(F.pathIs(String, ["b", "i"], RAW_DATA)).toBeFalsy()
})

/* eslint-enable func-style */
