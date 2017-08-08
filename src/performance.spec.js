import test from 'ava'
import execa from 'execa'

// 0  1  2    3     4     5
// // => name took: speed milliseconds.
const getSpeed = (x) => parseFloat(x.split(` `)[4])
// const oldSpeed = getSpeed(oldTime)
// const newSpeed = getSpeed(newTime)
const cwd = process.cwd()
const {log: _log} = console
const log = _log.bind(console)

test.cb(`f-utility/map should be faster than ramda/map`, (t) => {
  console.log(`executing stuff`)
  execa.shell(`${cwd}/../node_modules/.bin/babel-node ${cwd}/performance.fixture.js`).then(
    (output) => {
      log(output.stdout)
      const lines = output.stdout.split(`\n`)
      const speeds = lines.map(getSpeed)
      const [naiveCurry, ramdaMap, fUtilityMap, entrustMap] = speeds
      t.truthy(ramdaMap < entrustMap)
      t.truthy(naiveCurry < ramdaMap)
      t.truthy(fUtilityMap > ramdaMap)
      t.end()
    }
  )
  .catch(
    (e) => {
      log(e)
      t.fail()
    }
  )
  // setTimeout(() => t.end(), 3e3)
  // t.end()
})
