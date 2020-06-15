import OLD from "f-utility"
import R from "ramda"
import PKG from "../package.json"
import F from "$build/debug"
/* const OLD = require("../old-f-utility") */

test("version", () => {
  expect(F.version).toEqual(PKG.version)
})

/* eslint-disable func-style */
describe("comparisons", () => {
  const futilityMethods = F.keys(F)
  expect(
    futilityMethods.sort((a, b) => (a !== b ? (a > b ? 1 : -1) : 0))
  ).toMatchSnapshot()
  const FUTILITY_VS_RAMDA = F.difference(futilityMethods, R.keys(R))
  const RAMDA_VS_FUTILITY = F.difference(R.keys(R), futilityMethods)
  const F4_VS_F3 = F.difference(futilityMethods, R.keys(OLD))
  const F3_VS_F4 = F.difference(R.keys(OLD), futilityMethods)
  test("f-utility vs. ramda", () => {
    expect(FUTILITY_VS_RAMDA).toMatchSnapshot()
  })
  test("ramda vs. f-utility", () => {
    expect(RAMDA_VS_FUTILITY).toMatchSnapshot()
  })
  test("v3 vs. v4", () => {
    expect(F3_VS_F4).toMatchSnapshot()
  })
  test("v4 vs. v3", () => {
    expect(F4_VS_F3).toMatchSnapshot()
  })
  test("symmetricDifference", () => {
    expect(F.symmetricDifference(F.keys(F), F.keys(R))).toEqual(
      R.symmetricDifference(F.keys(F), F.keys(R))
    )
    expect(F.symmetricDifference([1, 2, 3], [4, 5, 6])).toEqual([
      1,
      2,
      3,
      4,
      5,
      6
    ])
    expect(F.symmetricDifference([1, 2, 3, 4], [4, 5, 6])).toEqual([
      1,
      2,
      3,
      5,
      6
    ])
    expect(F.symmetricDifference([], [1, 2, 3])).toEqual([1, 2, 3])
    expect(F.symmetricDifference([1, 2, 3], [])).toEqual([1, 2, 3])
    expect(F.symmetricDifference([1, 2, 3], [1, 2, 3])).toEqual([])
    expect(F.symmetricDifference([1, 2, 3, 4, 5], [1, 2, 3])).toEqual([4, 5])
  })
})

/* eslint-enable func-style */
