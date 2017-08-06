import test from 'ava'
import {isString, isNil, isBoolean, isNumber, isObject, isFunction} from './types'

test(`types!`, (t) => {
  t.truthy(isBoolean(true))
  t.truthy(isBoolean(false))
  t.truthy(isNumber(100))
  t.truthy(isObject({}))
  t.falsy(isObject(null))
  t.truthy(isFunction(() => {}))
  t.truthy(isNil(null))
  t.truthy(isNil(undefined))
  t.falsy(isNil(false))
  t.falsy(isString(false))
  t.truthy(isString(`false`))
})
