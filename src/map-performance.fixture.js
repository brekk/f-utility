// const {curry} = require(`katsu-curry`)
// const testPerf = require(`testperf`)
import testPerf from 'testperf'
// const {array} = require(`fast.js`)
import {array} from 'fast.js'
import rMap from 'ramda/src/map'
import rCurry from 'ramda/src/curry'
import {e1} from 'entrust'
const {map: fMap} = require(`../f-utility`)
const {map: fastMap} = array

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
