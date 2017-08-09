// const {curry} = require(`katsu-curry`)
const testPerf = require(`testperf`)
const {array} = require(`fast.js`)
const {map: fastMap} = array
const rMap = require(`ramda/src/map`)
const rCurry = require(`ramda/src/curry`)
const {e1} = require(`entrust`)
const {map: fMap} = require(`../f-utility`)

const entrustMap = e1(`map`)

const testMap = (map) => (numRange) => {
  const double = map((x) => x * 2)
  // const half = map((x) => x / 2)
  // const output = double(numRange).concat(half(numRange))
  const output = double(numRange)
  return output
}
const random = () => Math.round(Math.random() * 1e3)
const input = [random(), random(), random(), random(), random()]

testPerf(`futility`, testMap(fMap), input)
testPerf(`entrust`, testMap(entrustMap), input)
testPerf(`fastjs`, testMap((fn) => (a) => fastMap(a, fn)), input)
testPerf(`ramdaFastJS`, testMap(rCurry((fn, a) => fastMap(a, fn))), input)
testPerf(`ramda`, testMap(rMap), input)
