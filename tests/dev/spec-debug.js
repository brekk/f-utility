import test from 'ava'
import _debug from 'debug'
import random from '../../testing/random'
import {
  namespace,
  debug,
  wrapWithLog,
  namespaceAndAnnotate
} from '../../src/dev/debug'

test(`namespace is a curried string generator`, (t) => {
  t.plan(4)
  t.is(typeof namespace, `function`)
  t.is(typeof namespace(`a`), `function`)
  t.is(namespace(`a`, [`b`, `c`]), `a:b:c`)
  t.is(namespace([`a`, `b`], [`c`, `d`]), `a:b:c:d`)
})
test(`debug should be a convenience wrapper around the 'debug' module`, (t) => {
  t.plan(3)
  t.is(typeof debug, `function`)
  t.is(typeof debug(`a`), `function`)
  const args = [`a`, [`b`, `c`]]
  const generatedLocally = _debug(namespace(...args))
  const output = debug(...args)
  t.is(generatedLocally.toString(), output.toString())
})
test(`wrapWithLog should be a curried function decorator`, (t) => {
  t.plan(6)
  const noop = () => {}
  t.is(typeof wrapWithLog, `function`)
  t.is(typeof wrapWithLog(noop), `function`)
  t.is(typeof wrapWithLog(noop, noop), `function`)
  let gotFirst = false
  const log = (tag) => {
    if (!gotFirst) {
      t.is(tag, `# input`)
      gotFirst = true
    } else {
      t.is(tag, `# output`)
    }
  }
  const word = random.word(10)
  const out = wrapWithLog(log, () => word)
  t.is(word, out())
})
test(
  `namespaceAndAnnotate should be an all in one function for generating annotated functions`,
  (t) => {
    t.plan(9)
    const noop = () => {}
    t.is(typeof namespaceAndAnnotate, `function`)
    // curried testing
    t.is(typeof namespaceAndAnnotate(noop), `function`)
    t.is(typeof namespaceAndAnnotate(noop, `pkg`), `function`)
    t.is(typeof namespaceAndAnnotate(noop, `pkg`, [`a`, `b`]), `function`)
    // output
    t.is(typeof namespaceAndAnnotate(noop, `pkg`, [`a`, `b`], noop), `function`)
    let gotFirst = false
    const log = (ns) => {
      t.is(ns, `a:b:c`)
      return (tag) => {
        if (!gotFirst) {
          t.is(tag, `# input`)
          gotFirst = true
        } else {
          t.is(tag, `# output`)
        }
      }
    }
    const word = random.word(10)
    const outFunc = namespaceAndAnnotate(log, `a`, [`b`, `c`], () => word)
    t.is(word, outFunc())
  }
)
test(`namespaceAndAnnotate should coerce the namespaceList into an array if it isn't one`, (t) => {
  t.plan(2)
  const word = random.word(10)
  const log = (x) => {
    t.is(x, `a:cool`)
    return () => {}
  }
  const outFunc = namespaceAndAnnotate(log, `a`, `cool`, () => word)
  t.is(word, outFunc())
})
