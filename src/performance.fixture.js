// const {curry} = require(`katsu-curry`)
const testPerf = require(`testperf`)
const {array} = require(`fast.js`)
const {map: fastMap} = array
const rMap = require(`ramda/src/map`)
// const rCurry = require(`ramda/src/curry`)
const {e1} = require(`entrust`)
const {map: fMap, range} = require(`../f-utility`)

const entrustMap = e1(`map`)

const testMap = (map) => (numRange) => {
  const double = map((x) => x * 2)
  // const half = map((x) => x / 2)
  // const output = double(numRange).concat(half(numRange))
  const output = double(numRange)
  return output
}
const oneThruFive = range(1, 5)

testPerf(`naiveCurry(fast.js/map)`, testMap((fn) => (a) => fastMap(a, fn)), oneThruFive)
testPerf(`ramda/map`, testMap(rMap), oneThruFive)
testPerf(`f-utility/map`, testMap(fMap), oneThruFive)
testPerf(`entrustMap`, testMap(entrustMap), oneThruFive)
