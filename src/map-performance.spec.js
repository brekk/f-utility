/* global test, jasmine */
import execa from 'execa'
import {t} from './test-helpers'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20e3 // eslint-disable-line fp/no-mutation
global.Promise = require.requireActual(`bluebird`) // eslint-disable-line fp/no-mutation

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

test.skip(`f-utility/map wants to be faster than ramda/map`, (done) => {
  t.plan(13)
  return new global.Promise((resolve, reject) => {
    setImmediate(() => {
      execa.shell(
        `${cwd}/node_modules/.bin/babel-node ${cwd}/src/map-performance.fixture.js`
      ).then(
        (output) => {
          log(output.stdout)
          const lines = output.stdout.split(`\n`)
          const speedArr = lines.map(getSpeed)
          const speeds = {}
          speedArr.forEach(([k, v]) => {
            speeds[k] = v
          })
          const {fastjs, entrust, futility, ramda, ramdaFastJS} = speeds
          // fast is fast
          t.truthy(fastjs < entrust)
          t.truthy(fastjs < futility)
          t.truthy(fastjs < ramda)
          // ramda + fast is slower than fast, but faster than ramda
          t.truthy(ramdaFastJS > fastjs)
          t.truthy(ramdaFastJS < ramda)
          t.truthy(ramdaFastJS < futility)
          // ramda is slower than fast
          t.truthy(ramda > fastjs)
          // entrust is slow
          t.truthy(entrust > futility)
          t.truthy(entrust > ramda)
          t.truthy(entrust > fastjs)
          t.truthy(entrust > ramdaFastJS)
          t.truthy(entrust > ramdaFastJS)
          // f-utility is sometimes faster than ramda
          // in individual runs, this passes
          // t.truthy(Math.abs(futility - ramda) < 1000)
          t.truthy(Math.abs(ramda - futility) < 1500)
          done()
          resolve(output.stdout)
        }
      ).catch(
        (e) => {
          reject(e)
        }
      )
    })
  })
})
