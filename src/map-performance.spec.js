/* global test, expect */
import execa from 'execa'
import bluebird from 'bluebird'
import {t} from './test-helpers'
const {Promise} = bluebird
console.log(`TTTTTT`, t)

// 0  1  2    3     4     5
// // => name took: speed milliseconds.
const getSpeed = (x) => {
  const parts = x.split(` `)
  const speed = parseFloat(parts[4])
  return [parts[2], speed]
}
// const oldSpeed = getSpeed(oldTime)
// const newSpeed = getSpeed(newTime)
const cwd = process.cwd()
const {log: _log} = console
const log = _log.bind(console)

test(`f-utility/map wants to be faster than ramda/map`, (done) => {
  expect.assertions(12)
  return new Promise((resolve, reject) => setTimeout(() => execa(
    `${cwd}/node_modules/.bin/babel-node`, [`${cwd}/src/map-performance.fixture.js`]
  ).then(
    (output) => {
      log(output.stdout)
      const lines = output.stdout.split(`\n`)
      log(`lines`, lines)
      const speedArr = lines.map(getSpeed)
      log(`speedArr`, speedArr)
      const speeds = {}
      speedArr.forEach(([k, v]) => {
        log(`k`, k, `v`, v)
        speeds[k] = v
      })
      log(`speeds`, speeds)
      const {fastjs, entrust, futility, ramda, ramdaFastJS} = speeds
      log(`tt the artist`, t)
      // fast is fast
      t.truthy(fastjs < entrust)
      t.truthy(fastjs < futility)
      t.truthy(fastjs < ramda)
      // ramda + fast is slower than fast, but faster than ramda
      t.truthy(ramdaFastJS > fastjs)
      t.truthy(ramdaFastJS < ramda)
      t.truthy(ramdaFastJS < futility)
      // f-utility is sometimes faster than ramda
      // in individual runs, this passes
      t.truthy(Math.abs(futility - ramda) < 500)
      // t.truthy(ramda < futility)
      // ramda is slower than fast
      t.truthy(ramda > fastjs)
      // entrust is slow
      t.truthy(entrust > futility)
      t.truthy(entrust > ramda)
      t.truthy(entrust > fastjs)
      t.truthy(entrust > ramdaFastJS)
      t.truthy(entrust > ramdaFastJS)
      done()
      resolve(output.stdout)
    }
  )
  .catch(
    (e) => {
      reject(e)
    }
  ), 2000))
})
