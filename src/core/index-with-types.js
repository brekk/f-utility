import { FUNCTION as compose, SIGNATURE as composeSignature } from "./compose"
import { FUNCTION as drop, SIGNATURE as dropSignature } from "./drop"
import {
  FUNCTION as dropLast,
  SIGNATURE as dropLastSignature
} from "./dropLast"
import { FUNCTION as empty, SIGNATURE as emptySignature } from "./empty"
import { FUNCTION as invert, SIGNATURE as invertSignature } from "./invert"
import {
  FUNCTION as invertObj,
  SIGNATURE as invertObjSignature
} from "./invertObj"
import { FUNCTION as juxt, SIGNATURE as juxtSignature } from "./juxt"
import { FUNCTION as keysIn, SIGNATURE as keysInSignature } from "./keysIn"
import { FUNCTION as move, SIGNATURE as moveSignature } from "./move"
import { FUNCTION as negate, SIGNATURE as negateSignature } from "./negate"
import { FUNCTION as nthArg, SIGNATURE as nthArgSignature } from "./nthArg"
import { FUNCTION as objOf, SIGNATURE as objOfSignature } from "./objOf"
import { FUNCTION as once, SIGNATURE as onceSignature } from "./once"
import { FUNCTION as pair, SIGNATURE as pairSignature } from "./pair"
import { FUNCTION as partial, SIGNATURE as partialSignature } from "./partial"
import {
  FUNCTION as partialRight,
  SIGNATURE as partialRightSignature
} from "./partialRight"
import { FUNCTION as repeat, SIGNATURE as repeatSignature } from "./repeat"
import { FUNCTION as splitAt, SIGNATURE as splitAtSignature } from "./splitAt"
import { FUNCTION as sum, SIGNATURE as sumSignature } from "./sum"
import { FUNCTION as product, SIGNATURE as productSignature } from "./product"
import { FUNCTION as take, SIGNATURE as takeSignature } from "./take"
import {
  FUNCTION as takeLast,
  SIGNATURE as takeLastSignature
} from "./takeLast"
import {
  FUNCTION as regexTest,
  SIGNATURE as regexTestSignature
} from "./regexTest"

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
import { FUNCTION as T, SIGNATURE as TSignature } from "./T"
import { FUNCTION as weld, SIGNATURE as weldSignature } from "./weld"
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
  [boxSignature, box],
  [callSignature, call],
  [complementSignature, complement],
  [composeSignature, compose],
  [constantSignature, constant],
  [decSignature, dec],
  [dissocSignature, dissoc],
  [dropLastSignature, dropLast],
  [dropSignature, drop],
  [emptySignature, empty],
  [firstSignature, first],
  [fromPairsSignature, fromPairs],
  [identitySignature, identity],
  [incSignature, inc],
  [initSignature, init],
  [invertObjSignature, invertObj],
  [invertSignature, invert],
  [jamSignature, jam],
  [juxtSignature, juxt],
  [keysInSignature, keysIn],
  [lastSignature, last],
  [lengthSignature, length],
  [mashSignature, mash],
  [meanSignature, mean],
  [memoizeWithSignature, memoizeWith],
  [modeSignature, mode],
  [moveSignature, move],
  [negateSignature, negate],
  [notSignature, not],
  [nthArgSignature, nthArg],
  [objOfSignature, objOf],
  [onceSignature, once],
  [pairSignature, pair],
  [partialRightSignature, partialRight],
  [partialSignature, partial],
  [pipeSignature, pipe],
  [prependSignature, prepend],
  [repeatSignature, repeat],
  [reverseSignature, reverse],
  [smashSignature, smash],
  [splitAtSignature, splitAt],
  [sumSignature, sum],
  [productSignature, product],
  [tailSignature, tail],
  [takeLastSignature, takeLast],
  [takeSignature, take],
  [weldSignature, weld],
  [regexTestSignature, regexTest],
  [toLowerSignature, toLower],
  [toPairsSignature, toPairs],
  [toUpperSignature, toUpper],
  [updateSignature, update]
]

export function makeSignedCore(def) {
  return CORE_WITH_SIGNATURES.reduce(function petition(agg, [hm, fn]) {
    return mash(agg, {
      [fn.name === "regexTest" ? "test" : fn.name]: def({ hm, check: true })(fn)
    })
  }, NATIVE)
}

export default makeSignedCore
