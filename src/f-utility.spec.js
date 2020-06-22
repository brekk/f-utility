import OLD from "f-utility"
import R from "ramda"
// import PKG from "../package.json"
import exam from "$build/tester"
/* const OLD = require("../old-f-utility") */

// exam("version", F => () => {
//   expect(F.version).toEqual(PKG.version)
// })
exam("snapshot", F => () => {
  const sortedSnapKeys = F.pipe(
    F.filter(F.is(Function)),
    F.keys,
    F.sort((a, b) => a - b)
  )(F)
  expect(sortedSnapKeys).toMatchSnapshot()
})
exam("shared interface", F => () => {
  const getMethods = F.pipe(F.filter(F.is(Function)), F.keys)
  expect(F.intersection(getMethods(F), getMethods(R))).toMatchSnapshot()
})

/* eslint-disable func-style */
exam("f-utility vs. ramda", F => () => {
  const futilityMethods = F.pipe(F.filter(F.is(Function)), F.keys)(F)
  const FUTILITY_VS_RAMDA = F.difference(futilityMethods, R.keys(R))
  expect(FUTILITY_VS_RAMDA).toMatchSnapshot()
})
exam("ramda vs. f-utility", F => () => {
  const futilityMethods = F.pipe(F.filter(F.is(Function)), F.keys)(F)
  const RAMDA_VS_FUTILITY = F.difference(R.keys(R), futilityMethods)
  expect(RAMDA_VS_FUTILITY).toMatchSnapshot()
})
exam("v3 vs. v4", F => () => {
  const futilityMethods = F.pipe(F.filter(F.is(Function)), F.keys)(F)
  const F3_VS_F4 = F.difference(R.keys(OLD), futilityMethods)
  expect(F3_VS_F4).toMatchSnapshot()
})
exam("v4 vs. v3", F => () => {
  const futilityMethods = F.pipe(F.filter(F.is(Function)), F.keys)(F)
  const F4_VS_F3 = F.difference(futilityMethods, R.keys(OLD))
  expect(F4_VS_F3).toMatchSnapshot()
})
