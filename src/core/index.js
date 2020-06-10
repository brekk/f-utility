import * as NATIVE from "./native"
// :read !ls src/core | grep -v spec | grep -v native
// :5,30s#\(.*\)\.js\n#import {FUNCTION as \1, SIGNATURE as \1Signature} from "./\1"#g

import { FUNCTION as box, SIGNATURE as boxSignature } from "./box"
import { FUNCTION as call, SIGNATURE as callSignature } from "./call"
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
import { FUNCTION as not, SIGNATURE as notSignature } from "./not"
import { FUNCTION as pipe, SIGNATURE as pipeSignature } from "./pipe"
import { FUNCTION as smash, SIGNATURE as smashSignature } from "./smash"
import { FUNCTION as smooth, SIGNATURE as smoothSignature } from "./smooth"
import { FUNCTION as T, SIGNATURE as TSignature } from "./T"
import { FUNCTION as temper, SIGNATURE as temperSignature } from "./temper"
import { FUNCTION as toLower, SIGNATURE as toLowerSignature } from "./toLower"
import { FUNCTION as toPairs, SIGNATURE as toPairsSignature } from "./toPairs"
import { FUNCTION as toUpper, SIGNATURE as toUpperSignature } from "./toUpper"

const SIGNED_CORE = [
  [box, boxSignature],
  [call, callSignature],
  [complement, complementSignature],
  [constant, constantSignature],
  [F, FSignature],
  [first, firstSignature],
  [fromPairs, fromPairsSignature],
  [identity, identitySignature],
  [jam, jamSignature],
  [last, lastSignature],
  [length, lengthSignature],
  [mash, mashSignature],
  [not, notSignature],
  [pipe, pipeSignature],
  [smash, smashSignature],
  [smooth, smoothSignature],
  [T, TSignature],
  [temper, temperSignature],
  [toLower, toLowerSignature],
  [toPairs, toPairsSignature],
  [toUpper, toUpperSignature]
]

export const CORE = temper(NATIVE, {
  F,
  T,
  box,
  call,
  complement,
  constant,
  first,
  fromPairs,
  identity,
  jam,
  last,
  length,
  smash,
  mash,
  not,
  pipe,
  smooth,
  temper,
  toLower,
  toPairs,
  toUpper
})
export default CORE
