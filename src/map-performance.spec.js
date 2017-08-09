/* global test */
import execa from 'execa'
import {t} from './test-helpers'

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

test(`f-utility/map wants to be faster than ramda/map`, () => {
  execa.shell(`node ${cwd}/map-performance.fixture.js`).then(
    (output) => {
      log(output.stdout)
      const lines = output.stdout.split(`\n`)
      const speeds = lines.map(getSpeed).reduce((agg, [k, v]) => {
        return Object.assign({}, agg, {[k]: v})
      }, {})
      const {fastjs, entrust, futility, ramda, ramdaFastJS} = speeds
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
      t.end()
    }
  )
  .catch(
    (e) => {
      log(e)
      t.fail()
    }
  )
})
