import getOr from 'lodash/fp/getOr'
import reduce from 'lodash/fp/reduce'
import curry from 'lodash/fp/curry'
import clone from 'lodash/fp/clone'
import flow from 'lodash/fp/flow'
import {debug as makeDebugger} from '../dev/debug'

export const VALUE_UNSET = `GET-POTENTIAL-INITIAL-VALUE`

export const available = curry(function _available(defaultValueOrFn, thing, structure, x) {
  if (structure && structure.matched) {
    return structure
  }
  if (!structure.defaultValue) {
    const invoked = (typeof defaultValueOrFn === `function`) ?
      defaultValueOrFn(x) :
      defaultValueOrFn
    structure.defaultValue = invoked
  }
  const test = getOr(VALUE_UNSET, x, clone(thing))
  if (VALUE_UNSET !== test) {
    structure.match = test
    structure.matched = true
  }
  return structure
})

export const getPotential = curry(function _getPotential(
  defaultValueOrFn, accessors, thing
) {
  const copy = clone(thing)
  const staticDefault = (typeof defaultValueOrFn !== `function`)
  const accessorIsArray = Array.isArray(accessors)
  const isSingularAccessor = (!accessorIsArray || accessors.length && accessors.length === 1)
  if (staticDefault && isSingularAccessor) {
    const singleAccessor = accessorIsArray ?
      accessors[0] :
      accessors
    return getOr(defaultValueOrFn, singleAccessor, copy)
  } else if (!staticDefault && isSingularAccessor) {
    const matched = getOr(VALUE_UNSET, accessors, copy)
    // delay invocation of our function
    if (matched !== VALUE_UNSET) {
      return matched
    }
    return defaultValueOrFn()
  }
  // else if (staticDefault && !isSingularAccessor) {
  const out = flow(
    reduce(available(defaultValueOrFn, copy), {matched: false}),
    (x) => {
      const matched = x.matched || false
      const match = x.match
      const defaultValue = x.defaultValue
      if (matched && match) {
        return match
      }
      return defaultValue
    }
  )(accessors)
  // const eventual = reduce(available(defaultValueOrFn, copy), accessors)
  return out
})
