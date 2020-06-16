import { FUNCTION as box, SIGNATURE as boxSignature } from "./box"
import { FUNCTION as dissoc, SIGNATURE as dissocSignature } from "./dissoc"
import { FUNCTION as assoc, SIGNATURE as assocSignature } from "./assoc"
import { FUNCTION as init, SIGNATURE as initSignature } from "./init"
import { FUNCTION as tail, SIGNATURE as tailSignature } from "./tail"
import { FUNCTION as append, SIGNATURE as appendSignature } from "./append"
import { FUNCTION as prepend, SIGNATURE as prependSignature } from "./prepend"
import { FUNCTION as adjust, SIGNATURE as adjustSignature } from "./adjust"
import { FUNCTION as update, SIGNATURE as updateSignature } from "./update"
import { FUNCTION as inc, SIGNATURE as incSignature } from "./inc"
import { FUNCTION as dec, SIGNATURE as decSignature } from "./dec"
import { FUNCTION as call, SIGNATURE as callSignature } from "./call"
import { FUNCTION as mode, SIGNATURE as modeSignature } from "./mode"
import {
  FUNCTION as complement,
  SIGNATURE as complementSignature
} from "./complement"
import {
  FUNCTION as constant,
  SIGNATURE as constantSignature
} from "./constant"
import { FUNCTION as F, SIGNATURE as FSignature } from "./F"
import { FUNCTION as first, SIGNATURE as firstSignature } from "./first"
import {
  FUNCTION as fromPairs,
  SIGNATURE as fromPairsSignature
} from "./fromPairs"
import {
  FUNCTION as identity,
  SIGNATURE as identitySignature
} from "./identity"
import { FUNCTION as jam, SIGNATURE as jamSignature } from "./jam"
import { FUNCTION as last, SIGNATURE as lastSignature } from "./last"
import { FUNCTION as length, SIGNATURE as lengthSignature } from "./length"
import { FUNCTION as mash, SIGNATURE as mashSignature } from "./mash"
import {
  FUNCTION as memoizeWith,
  SIGNATURE as memoizeWithSignature
} from "./memoize-with"
import * as NATIVE from "./native"
import { FUNCTION as not, SIGNATURE as notSignature } from "./not"
import { FUNCTION as pipe, SIGNATURE as pipeSignature } from "./pipe"
import { FUNCTION as reverse, SIGNATURE as reverseSignature } from "./reverse"
import { FUNCTION as smash, SIGNATURE as smashSignature } from "./smash"
import { FUNCTION as smooth, SIGNATURE as smoothSignature } from "./smooth"
import { FUNCTION as T, SIGNATURE as TSignature } from "./T"
import { FUNCTION as temper, SIGNATURE as temperSignature } from "./temper"
import { FUNCTION as toLower, SIGNATURE as toLowerSignature } from "./toLower"
import { FUNCTION as toPairs, SIGNATURE as toPairsSignature } from "./toPairs"
import { FUNCTION as toUpper, SIGNATURE as toUpperSignature } from "./toUpper"
import { FUNCTION as mean, SIGNATURE as meanSignature } from "./mean"

const CORE_WITH_SIGNATURES = [
  [FSignature, F],
  [TSignature, T],
  [adjustSignature, adjust],
  [appendSignature, append],
  [assocSignature, assoc],
  [dissocSignature, dissoc],
  [boxSignature, box],
  [callSignature, call],
  [complementSignature, complement],
  [constantSignature, constant],
  [decSignature, dec],
  [firstSignature, first],
  [fromPairsSignature, fromPairs],
  [identitySignature, identity],
  [incSignature, inc],
  [jamSignature, jam],
  [lastSignature, last],
  [initSignature, init],
  [tailSignature, tail],
  [lengthSignature, length],
  [mashSignature, mash],
  [meanSignature, mean],
  [modeSignature, mode],
  [memoizeWithSignature, memoizeWith],
  [notSignature, not],
  [pipeSignature, pipe],
  [prependSignature, prepend],
  [reverseSignature, reverse],
  [smashSignature, smash],
  [smoothSignature, smooth],
  [temperSignature, temper],
  [toLowerSignature, toLower],
  [toPairsSignature, toPairs],
  [toUpperSignature, toUpper],
  [updateSignature, update]
]

export function makeSignedCore(def) {
  return CORE_WITH_SIGNATURES.reduce(function petition(agg, [hm, fn]) {
    return mash(agg, { [fn.name]: def({ hm, check: true })(fn) })
  }, NATIVE)
}

export default makeSignedCore
