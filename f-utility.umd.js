(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FUTILITY = factory());
}(this, (function () { 'use strict';

  var name = "f-utility";
  var version = "4.0.0";
  var description = "functional utilities";
  var license = "ISC";
  var repository = "brekk/f-utility";
  var author = "brekk";
  var main = "f-utility.js";
  var module$1 = "f-utility.es.js";
  var browser = "f-utility.umd.js";
  var scripts = {
  	docs: "nps docs",
  	dependencies: "nps dependencies",
  	readme: "nps readme",
  	lint: "nps lint",
  	test: "nps test",
  	build: "nps build",
  	care: "nps care",
  	precommit: "nps precommit",
  	prepublishOnly: "nps prepublishOnly"
  };
  var keywords = [
  	"functional programming",
  	"functional",
  	"pattern",
  	"fp",
  	"utility",
  	"composable",
  	"hoc",
  	"tool",
  	"toolbelt"
  ];
  var devDependencies = {
  	"babel-cli": "^6.26.0",
  	"babel-core": "^6.26.0",
  	"babel-eslint": "^8.0.3",
  	"babel-jest": "^21.2.0",
  	"babel-plugin-module-resolver": "^3.0.0",
  	"babel-plugin-syntax-async-functions": "^6.13.0",
  	"babel-plugin-transform-async-to-generator": "^6.24.1",
  	"babel-plugin-transform-es2015-destructuring": "^6.23.0",
  	"babel-plugin-transform-object-rest-spread": "^6.26.0",
  	"babel-preset-es2015": "^6.24.1",
  	"babel-preset-fbjs": "^2.1.4",
  	"babel-preset-react": "^6.24.1",
  	"babel-preset-stage-2": "^6.24.1",
  	"babel-register": "^6.26.0",
  	bluebird: "^3.5.1",
  	chalk: "^2.3.0",
  	"del-cli": "^1.1.0",
  	depcheck: "^0.6.8",
  	documentation: "^5.3.5",
  	"dont-break": "^1.12.0",
  	eslint: "^4.13.1",
  	"eslint-config-prettier": "^3.3.0",
  	"eslint-config-standard": "^11.0.0-beta.0",
  	"eslint-plugin-ava": "^4.4.0",
  	"eslint-plugin-babel": "^4.1.2",
  	"eslint-plugin-fp": "^2.3.0",
  	"eslint-plugin-import": "^2.8.0",
  	"eslint-plugin-node": "^5.2.1",
  	"eslint-plugin-prettier": "^3.0.0",
  	"eslint-plugin-promise": "^3.6.0",
  	"eslint-plugin-react": "^7.5.1",
  	"eslint-plugin-standard": "^3.0.1",
  	execa: "^0.8.0",
  	"f-utility": "3.6.0",
  	"fantasy-eithers": "^0.0.2",
  	germs: "^0.1.9",
  	husky: "^0.14.3",
  	jayin: "^0.0.3",
  	jest: "^21.2.1",
  	"jest-cli": "^21.2.1",
  	"jest-t-assert": "^0.2.0",
  	madge: "^3.0.1",
  	nps: "^5.7.1",
  	"nps-utils": "^1.5.0",
  	prettier: "^1.15.2",
  	ramda: "^0.26.1",
  	rollup: "^0.66.6",
  	"rollup-plugin-alias": "^1.4.0",
  	"rollup-plugin-babel-minify": "^3.1.2",
  	"rollup-plugin-babili": "^3.1.1",
  	"rollup-plugin-buble": "^0.19.4",
  	"rollup-plugin-cleanup": "^3.0.0",
  	"rollup-plugin-commonjs": "^9.2.0",
  	"rollup-plugin-json": "^3.1.0",
  	"rollup-plugin-node-resolve": "^3.0.0",
  	"rollup-plugin-progress": "^0.4.0",
  	testperf: "^2.0.3"
  };
  var reveal = true;
  var clinton = {
  	inherit: false,
  	rules: {
  		cli: "error",
  		editorconfig: "off",
  		"filename-case": [
  			"error",
  			{
  				"case": "kebabCase"
  			}
  		],
  		gulp: [
  			"error",
  			"optional"
  		],
  		keywords: "error",
  		license: "ISC",
  		"max-depth": "warn",
  		"no-callback": "error",
  		"no-dup-keywords": "error",
  		"no-empty-keywords": "error",
  		"no-git-merge-conflict": "error",
  		"pkg-dependency-order": "error",
  		"pkg-description": "off",
  		"pkg-engine": "off",
  		"pkg-main": "error",
  		"pkg-name": "error",
  		"pkg-normalize": "warn",
  		"pkg-property-order": "error",
  		"pkg-schema": "error",
  		"pkg-shorthand-repository": "error",
  		"pkg-user-order": "error",
  		readme: "error",
  		"test-script": "error",
  		"use-travis": "off",
  		"valid-version": "error",
  		ava: "off",
  		gitignore: "error",
  		xo: "off"
  	}
  };
  var jest = {
  	modulePaths: [
  		"src"
  	],
  	moduleDirectories: [
  		"node_modules",
  		"src"
  	],
  	mapCoverage: true,
  	moduleFileExtensions: [
  		"js",
  		"json"
  	],
  	testMatch: [
  		"**/*.spec.(jsx|js)"
  	]
  };
  var PKG = {
  	name: name,
  	version: version,
  	description: description,
  	license: license,
  	repository: repository,
  	author: author,
  	main: main,
  	module: module$1,
  	browser: browser,
  	scripts: scripts,
  	keywords: keywords,
  	devDependencies: devDependencies,
  	reveal: reveal,
  	clinton: clinton,
  	jest: jest
  };

  var __of__ = "∋";
  var UNION_TYPE_DELIMITER = "|";
  var C = Object.freeze({
    $: "@@FUTILITY::constant.magic",
    UNMATCHED: "@@FUTILITY::constant.unmatched",
    b: "\b",
    f: "\f",
    n: "\n",
    t: "\t",
    r: "\r",
    q: "'",
    qq: '"',
    s: "\\",
    __of__: __of__,
    UNION_TYPE_DELIMITER: UNION_TYPE_DELIMITER
  });

  function memoizeWith(memoizer) {
    return function memoize(fn) {
      var saved = {};
      function memoized() {
        var args = Array.from(arguments);
        var mem = memoizer(args);
        if (mem && saved[mem]) { return saved[mem] }
        saved[mem] = fn.apply(null, args);
        return saved[mem]
      }
      return memoized
    }
  }

  function ofConstructor(Ctor) {
    return function ofConstructorsAndMagic(xx) {
      return (xx && xx.constructor === Ctor) || xx instanceof Ctor
    }
  }

  function ofType(exp) {
    return function compareTypeofs(xx) {
      return typeof xx === exp
    }
  }

  var ref = [String, Number, Function, Boolean, Symbol, Object].map(ofConstructor);
  var _isString = ref[0];
  var _isNumber = ref[1];
  var _isFunction = ref[2];
  var _isBoolean = ref[3];
  var _isSymbol = ref[4];
  var _isRawObject = ref[5];
  var isUndefined = ofType("undefined");
  var isString = _isString;
  var isNumber = _isNumber;
  var isFunction = _isFunction;
  var isBoolean = _isBoolean;
  var isSymbol = _isSymbol;
  var isRawObject = _isRawObject;
  var isArray = Array.isArray;

  var ARCHETYPES = Object.freeze({
    string: "String∋string",
    number: "Number∋number",
    boolean: "Boolean∋boolean",
    function: "Function∋function",
    object: "Object∋object",
    undefined: "Global∋nil",
    symbol: "Symbol∋symbol",
    nil: "Global∋nil"
  });

  var U = C.UNION_TYPE_DELIMITER;
  var __of__$1 = C.__of__;
  function unionArchetype(recurse) {
    return function arch(tt) {
      if (tt && tt.indexOf && tt.indexOf(U) > -1 && recurse) {
        return tt.split(U).map(function (z) { return unionArchetype(false)(z); })
      }
      var match = ARCHETYPES[tt];
      if (match) { return match }
      if (tt[0].toUpperCase() === tt[0]) { return ("" + tt + __of__$1 + "object") }
      return tt
    }
  }
  var archetype = unionArchetype(true);

  var isArray$1 = Array.isArray;
  var keys = Object.keys;
  var freeze = Object.freeze;
  function mash(a, b) {
    return Object.assign({}, a, b)
  }
  function jam(a, b) {
    return mash(b, a)
  }
  function smash(args) {
    var rawArgs = Array.from(arguments);
    if (!Array.isArray(args) && rawArgs.length) {
      args = rawArgs;
    }
    return args.reduce(function (agg, xx) { return mash(agg, xx); })
  }
  function temper(a, b) {
    return freeze(mash(a, b))
  }
  function apply(fn, args) {
    return fn.apply(null, args)
  }
  function call(args) {
    return args[0].apply(null, args.slice(1))
  }
  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  var NATIVE = /*#__PURE__*/Object.freeze({
    isArray: isArray$1,
    keys: keys,
    freeze: freeze,
    mash: mash,
    jam: jam,
    smash: smash,
    temper: temper,
    apply: apply,
    call: call,
    max: max,
    min: min,
    round: round
  });

  function symbolToString(s) {
    return "" + s.toString()
  }

  function defaultMemoizer(raw) {
    var x = raw[0];
    var y = raw[1];
    return x
      .concat(y)
      .map(function (z) { return (typeof z === "symbol" ? symbolToString(z) : z); })
      .join("-")
  }

  var memo = memoizeWith(function identity(x) {
    return x
  });
  var union = memo(function unionType(x) {
    return x.split("|")
  });

  var __of__$2 = C.__of__;
  var memo$1 = memoizeWith(function (x) { return x; });
  var constructor = memo$1(function (x) {
    var oof = x.indexOf(__of__$2);
    return oof > -1 ? x.slice(0, oof) : x
  });

  var __of__$3 = C.__of__;
  var memo$2 = memoizeWith(function (x) { return x; });
  var typeChild = memo$2(function (x) {
    var oof = x.indexOf(__of__$3);
    return oof > -1 ? x.slice(oof + 1) : x
  });

  var memo$3 = memoizeWith(function (x) { return x; });
  var compareTypes = memo$3(function _compareTypes(exp, given) {
    var ref = [exp, given].map(union);
    var expectedUnion = ref[0];
    var givenUnion = ref[1];
    var comparisons = expectedUnion.map(function (typeA) { return givenUnion.map(
        function (typeB) { return typeA === "any" ||
          typeB === "any" ||
          typeA === typeB ||
          constructor(typeA) === constructor(typeB) ||
          typeChild(typeA) === typeChild(typeB); }
      ); }
    );
    var unionComparisons = comparisons.reduce(
      function (all, nextCase) { return all.concat(nextCase.filter(function (z) { return !z; }).length === 0); },
      []
    );
    return unionComparisons.filter(function (z) { return !z; }).length === 0
  });

  function makeTypechecker(typecheck, useMemoizer) {
    if ( useMemoizer === void 0 ) useMemoizer = defaultMemoizer;
    return memoizeWith(useMemoizer)(function rawMakeTypeChecker(expected, given) {
      if (!Array.isArray(expected) || !Array.isArray(expected)) {
        throw new TypeError(
          "makeTypechecker needs two valid lists of types to run"
        )
      }
      var returnType = expected[expected.length - 1];
      var params = expected.slice(0, expected.length - 1);
      var results = params
        .slice(0, given.length)
        .map(function typeCheckParam(ex, ii) {
          var actual = typecheck(given[ii]);
          var success = compareTypes(actual, ex);
          var outcome = {
            idx: ii,
            raw: Object.freeze({ value: given[ii] }),
            actual: actual,
            expected: ex,
            success: success
          };
          return outcome
        })
        .reduce(
          function typeCheckOutcomes(outcome, ent) {
            var obj;
            var key = ent.success ? "valid" : "invalid";
            var partial = mash(outcome, ( obj = {}, obj[key] = outcome[key].concat([ent]), obj.rawParams = outcome.rawParams.concat([ent]), obj ));
            return mash(partial, {
              failures: outcome.failures || partial.invalid.length > 0
            })
          },
          {
            rawParams: [],
            invalid: [],
            valid: [],
            signature: expected.join(" -> "),
            params: params,
            returnType: returnType,
            given: given
          }
        );
      return results
    })
  }

  var UNMATCHED = C.UNMATCHED;
  function isUnmatched(z) {
    return z === UNMATCHED
  }

  var __of__$4 = C.__of__;
  function system(z) {
    var constructor = (z && z.constructor && z.constructor.name) || "Global";
    var type = typeof z;
    if (!z) {
      if (type === "undefined" || type === "object") {
        type = "nil";
      } else {
        constructor = "Boolean";
      }
    }
    return ("" + constructor + __of__$4 + type)
  }

  function checkParamsWith(checker) {
    return function checkParams(signature, given) {
      var checked = makeTypechecker(checker)(signature, given);
      return !checked.failures
    }
  }

  function checkReturnWith(checker) {
    return function checkReturn(outcome) {
      return function checkReturnTypeValidoutcomeAB(a, b) {
        var actual = checker(outcome);
        var expected = makeTypechecker(checker)(a, b).returnType;
        return compareTypes(expected, actual)
      }
    }
  }

  function autoCurryUsing(curryN) {
    return function autoCurry(CC) {
      return Object.keys(CC)
        .map(function wrapCurry(fnName) {
          var fn = CC[fnName];
          var isBinaryFunctionPlus = typeof fn === "function" && fn.length;
          return [fnName, isBinaryFunctionPlus ? curryN(fn.length, fn) : fn]
        })
        .reduce(function (agg, ref) {
          var obj;
          var k = ref[0];
          var v = ref[1];
          return Object.assign({}, agg, ( obj = {}, obj[k] = v, obj ));
      }, {})
    }
  }

  function makeAliases(F) {
    return F.temper(F, {
      __: F.$,
      PLACEHOLDER: F.$,
      I: F.identity,
      K: F.constant,
      always: F.constant,
      some: F.any,
      sideEffect2: F.binarySideEffect,
      merge: F.mash,
      mergeRight: F.jam,
      entries: F.toPairs,
      fromEntries: F.fromPairs,
      every: F.all
    })
  }

  function box(bx) {
    return [bx]
  }
  var FUNCTION = box;

  function complement(fn) {
    return function subtleComplement() {
      var args = Array.from(arguments);
      return !fn.apply(null, args)
    }
  }
  var FUNCTION$1 = complement;

  function constant(k) {
    return function forever() {
      return k
    }
  }
  var FUNCTION$2 = constant;

  function F() {
    return true
  }
  var FUNCTION$3 = F;

  function first(x) {
    return x[0]
  }
  var FUNCTION$4 = first;

  function fromPairs(ps) {
    return ps.reduce(function pairing(oo, ref) {
      var obj;
      var ke = ref[0];
      var va = ref[1];
      return Object.assign({}, oo, ( obj = {}, obj[ke] = va, obj ))
    }, {})
  }
  var FUNCTION$5 = fromPairs;

  function identity(y) {
    return y
  }
  var FUNCTION$6 = identity;

  function last(x) {
    return x[x.length - 1]
  }
  var FUNCTION$7 = last;

  function length(xx) {
    return xx && typeof xx === "object" ? Object.keys(xx).length : xx.length
  }
  var FUNCTION$8 = length;

  function not(yy) {
    return !yy
  }
  var FUNCTION$9 = not;

  function pipe() {
    var fns = Array.from(arguments);
    var nonFuncs = fns.filter(function (z) { return typeof z !== "function"; });
    if (nonFuncs.length !== 0)
      { throw new TypeError(
        ("Expected to receive functions as arguments, but received: " + (nonFuncs
          .map(function (a, i) { return ("[" + i + "] = " + a); })
          .join(" ; ")))
      ) }
    return function piped(x) {
      var len = fns.length;
      var idx = 0;
      var current = x;
      while (idx < len) {
      var fn = fns[idx];
      current = fn(current);
  idx += 1;
      }
      return current
    }
  }
  var FUNCTION$a = pipe;

  function smooth(x) {
    return x.filter(function identity(y) {
      return y
    })
  }
  var FUNCTION$b = smooth;

  function T() {
    return true
  }
  var FUNCTION$c = T;

  function toLower(z) {
    return z.toLowerCase()
  }
  var FUNCTION$d = toLower;

  function toPairs(oo) {
    return Object.keys(oo).map(function enpair(ky) {
      return [ky, oo[ky]]
    })
  }
  var FUNCTION$e = toPairs;

  function toUpper(z) {
    return z.toUpperCase()
  }
  var FUNCTION$f = toUpper;

  var CORE = temper(NATIVE, {
    box: FUNCTION,
    complement: FUNCTION$1,
    identity: FUNCTION$6,
    constant: FUNCTION$2,
    F: FUNCTION$3,
    first: FUNCTION$4,
    fromPairs: FUNCTION$5,
    last: FUNCTION$7,
    length: FUNCTION$8,
    not: FUNCTION$9,
    pipe: FUNCTION$a,
    smooth: FUNCTION$b,
    T: FUNCTION$c,
    toLower: FUNCTION$d,
    toPairs: FUNCTION$e,
    toUpper: FUNCTION$f
  });

  function makeSideEffectsFromEnv(curry) {
    var sideEffect = curry(function _sideEffect(fn, a) {
      fn(a);
      return a
    });
    var binarySideEffect = curry(function _binarySideEffect(fn, a, b) {
      fn(a, b);
      return b
    });
    var trace = binarySideEffect(console.log);
    var inspect = curry(function _inspect(fn, look, tag, x) {
      fn(tag, look(x));
      return x
    });
    return { sideEffect: sideEffect, binarySideEffect: binarySideEffect, trace: trace, inspect: inspect }
  }

  function makeParamMerger(taste) {
    return function compareParams(aa, bb) {
      return aa
        .map(function testGaps(yy) {
          return taste(yy) && bb[0] ? bb.shift() : yy
        })
        .concat(bb)
    }
  }
  function testCurryGaps(taste) {
    return function testCurryCapsByTaste(args) {
      return args.reduce(function doesCurryTasteGood(pp, x) {
        return taste(x) ? pp : pp + 1
      }, 0)
    }
  }
  function some(fn) {
    return function someInList(x) {
      return x.some(fn)
    }
  }
  function toString(fn, args) {
    if ( args === void 0 ) args = [];
    return function functionToString() {
      return ("curry(" + (fn.name || "fn") + ")" + (args.length > 0 ? ("(" + (args.join(",")) + ")") : ""))
    }
  }
  function hmError(name, actual, params) {
    return ("Given " + name + "( " + (actual &&
      actual.join(", ")) + " ) but expected " + name + "( " + (params
      .map(function (z) { return (Array.isArray(z) ? z.join("|") : z); })
      .slice(0, actual.length)
      .join(", ")) + " )")
  }
  function category(test) {
    return function testedCategory(ref) {
      var ts = ref.ts; if ( ts === void 0 ) ts = system;
      var givenLength = ref.n;
      var hm = ref.hm;
      var check = ref.check;
      if (check) {
        if (typeof ts !== "function")
          { throw new TypeError("Expected typeSystem to be a function.") }
        if (!hm || !Array.isArray(hm))
          { throw new TypeError("Expected hm to be an array of strings.") }
      }
      return function currified(fn) {
        var heat = testCurryGaps(test);
        var mergeParams = makeParamMerger(test);
        var isSpicy = some(test);
        function curried() {
          var args = Array.from(arguments);
          var nArgs =
            hm && Array.isArray(hm)
              ? hm.length - 1
              : givenLength && typeof givenLength === "number"
              ? givenLength
              : fn.length;
          var length = isSpicy(args) ? heat(args) : args.length;
          function saucy() {
            var args2 = Array.from(arguments);
            return curried.apply(this, mergeParams(args, args2))
          }
          saucy.toString = toString(fn, args);
          if (length >= nArgs) {
            var result = fn.apply(this, args);
            if (check) {
              var tChecker = makeTypechecker(ts)(hm, args);
              var isValid = checkParamsWith(ts)(hm, args);
              if (!isValid) {
                var rawParams = tChecker.rawParams;
                var params = tChecker.params;
                throw new TypeError(
                  hmError(
                    fn.name,
                    rawParams.map(function (z) { return z.actual; }),
                    params.map(archetype)
                  )
                )
              }
              var returnTypeValid = checkReturnWith(ts)(result)(hm, args);
              if (!returnTypeValid) {
                var returnType = tChecker.returnType;
                throw new TypeError(
                  ("Expected " + (fn.name) + " to return " + (archetype(
                    returnType
                  )) + " but got " + (system(result)) + ".")
                )
              }
            }
            return result
          }
          return saucy
        }
        curried.toString = toString(fn);
        return curried
      }
    }
  }

  var $ = C.$;
  function DEFAULT_PLACEHOLDER_TEST(x) {
    return x === $
  }
  function fabricate(config) {
    var test = config.test; if ( test === void 0 ) test = DEFAULT_PLACEHOLDER_TEST;
    var def = category(test);
    var curry = def(jam({ n: false, check: false }, config));
    var curryN = curry(function _curryN(nn, fn) {
      return def(jam({ n: nn, check: false }, config))(fn)
    });
    return { def: def, curry: curry, curryN: curryN }
  }
  fabricate(DEFAULT_PLACEHOLDER_TEST);

  function makeAddIndex(ref) {
    var curryN = ref.curryN;
    return function addIndex(fn) {
      return curryN(fn.length, function indexAddedIter() {
        var idx = 0;
        var args = Array.prototype.slice.call(arguments, 0);
        var origFn = args[0];
        var list = args[args.length - 1];
        args[0] = function indexAdded() {
          var result = origFn.apply(
            this,
            [].concat(arguments).concat([idx, list])
          );
          idx += 1;
          return result
        };
        return fn.apply(this, args)
      })
    }
  }

  function makeAnyPass(ref) {
    var curryN = ref.curryN;
    var pipe = ref.pipe;
    var map = ref.map;
    var flip = ref.flip;
    var any = ref.any;
    var smooth = ref.smooth;
    var length = ref.length;
    var gt = ref.gt;
    return curryN(ARITY$h, function anyPass(preds, xx) {
      return pipe(
        map(flip(any)(xx)),
        smooth,
        length,
        gt(0)
      )(preds)
    })
  }
  var ARITY$h = 2;

  function makeBind(ref) {
    var curryN = ref.curryN;
    return curryN(2, function bind(fn, _this) {
      function bound() {
        return fn.apply(_this, arguments)
      }
      return fn.length > 1 ? curryN(fn.length, bound) : bound
    })
  }

  function makeDifference(ref) {
    var curryN = ref.curryN;
    var filter = ref.filter;
    var includes = ref.includes;
    var complement = ref.complement;
    return curryN(ARITY$j, function difference(aa, bb) {
      return filter(complement(includes(bb)), aa)
    })
  }
  var ARITY$j = 2;

  function makeIterable(xx) {
    var isArray = Array.isArray(xx);
    var isObject = xx && typeof xx === "object";
    if (!isArray && !isObject) {
      throw new TypeError(
        "Expected iterable initial value to be either an array or an object."
      )
    }
    var len = length(xx);
    var init = isArray ? Array(len) : {};
    var xKeys = !isArray && Object.keys(xx);
    return {
      length: len,
      iterate: function iterate(idx) {
        var key = isArray ? idx : xKeys[idx];
        return { key: key, value: xx[key] }
      },
      init: init,
      isArray: isArray
    }
  }

  function makeSymmetricDifference(ref) {
    var curryN = ref.curryN;
    return curryN(ARITY$k, function symmetricDifference(aa, bb) {
      var aLoop = makeIterable(aa);
      var bLoop = makeIterable(bb);
      var notBoth = [];
      var idxA = 0;
      while (idxA < aLoop.length) {
        var ref = aLoop.iterate(idxA);
        var value = ref.value;
        if (!bb.includes(value)) { notBoth.push(value); }
        idxA += 1;
      }
      var idxB = 0;
      while (idxB < bLoop.length) {
        var ref$1 = bLoop.iterate(idxB);
        var value$1 = ref$1.value;
        if (!aa.includes(value$1)) { notBoth.push(value$1); }
        idxB += 1;
      }
      return notBoth
    })
  }
  var ARITY$k = 2;

  function makeFlip(ref) {
    var curryN = ref.curryN;
    return function flip(fn) {
      return curryN(2, function flipped(a, b) {
        return fn(b, a)
      })
    }
  }

  function makeIsObject(ref) {
    var both = ref.both;
    var isRawObject = ref.isRawObject;
    return function isObject(x) {
      return both(isRawObject, Boolean)(x)
    }
  }

  function makeJ2(ref) {
    var toJSON = ref.toJSON;
    return toJSON(2)
  }

  function makePathOrDerivatives(ref) {
    var equals = ref.equals;
    var is = ref.is;
    var curryN = ref.curryN;
    var pipe = ref.pipe;
    var pathOr = ref.pathOr;
    function deriveFromAccessor(acc) {
      return {
        accIs: curryN(3, function pathIsOfConstructor(J, ks, src) {
          return pipe(
            acc(C.UNMATCHED, ks),
            is(J)
          )(src)
        }),
        unsafe: acc(null),
        eq: curryN(3, function equivalence(ks, ex, src) {
          return pipe(
            acc(C.UNMATCHED, ks),
            equals(ex)
          )(src)
        }),
        satisfies: curryN(3, function satisfaction(fn, ks, src) {
          return pipe(
            acc(C.UNMATCHED, ks),
            fn,
            Boolean
          )(src)
        })
      }
    }
    var ref$1 = deriveFromAccessor(pathOr);
    var path = ref$1.unsafe;
    var pathEq = ref$1.eq;
    var pathSatisfies = ref$1.satisfies;
    var pathIs = ref$1.accIs;
    var propOr = curryN(3, function _propOr(dd, key, source) {
      return pathOr(dd, [key], source)
    });
    var ref$2 = deriveFromAccessor(propOr);
    var prop = ref$2.unsafe;
    var propEq = ref$2.eq;
    var propSatisfies = ref$2.satisfies;
    var propIs = ref$2.accIs;
    return {
      path: path,
      pathEq: pathEq,
      pathSatisfies: pathSatisfies,
      pathIs: pathIs,
      propOr: propOr,
      prop: prop,
      propEq: propEq,
      propSatisfies: propSatisfies,
      propIs: propIs
    }
  }

  function makePathOr(ref) {
    var curryN = ref.curryN;
    var reduce = ref.reduce;
    return curryN(ARITY$o, function pathOr(dd, ks, src) {
      return reduce(
        function walkPathOr(agg, st) {
          return (agg && agg[st]) || dd
        },
        src,
        ks
      )
    })
  }
  var ARITY$o = 3;

  function makeReject(ref) {
    var curryN = ref.curryN;
    var filter = ref.filter;
    var complement = ref.complement;
    return curryN(ARITY$p, function reject(fn, xx) {
      return filter(complement(fn), xx)
    })
  }
  var ARITY$p = 2;

  function makeUniq(ref) {
    var reduce = ref.reduce;
    return reduce(function unique(agg, xx) {
      return !agg.includes(xx) ? agg.concat(xx) : agg
    }, [])
  }

  function makeWhen(ref) {
    var ifElse = ref.ifElse;
    var identity = ref.identity;
    var $ = ref.$;
    return ifElse($, $, identity)
  }

  var derivedFunctionsSortedByIncreasingDependencies = {
    j2: makeJ2,
    addIndex: makeAddIndex,
    bind: makeBind,
    flip: makeFlip,
    when: makeWhen,
    reject: makeReject,
    uniq: makeUniq,
    isObject: makeIsObject,
    difference: makeDifference,
    symmetricDifference: makeSymmetricDifference,
    anyPass: makeAnyPass,
    pathOr: makePathOr,
    pathOrDerivatives: makePathOrDerivatives
  };
  function extendDerived(C) {
    return C.pipe(
      C.toPairs,
      C.reduce(function extendFUtility(__F, ref) {
        var obj;
        var name = ref[0];
        var maker = ref[1];
        var fn = maker(__F);
        return __F.mash(__F, name !== "pathOrDerivatives" ? ( obj = {}, obj[name] = fn, obj ) : fn)
      }, C)
    )(derivedFunctionsSortedByIncreasingDependencies)
  }

  function add(b, a) {
    return a + b
  }
  var FUNCTION$g = add;

  function and(a, b) {
    return a && b
  }
  var FUNCTION$h = and;

  function any(fn, xx) {
    var idx = 0;
    var found = false;
    var len = length(xx);
    while (idx < len && !found) {
      if (fn(xx[idx])) { found = true; }
      idx += 1;
    }
    return found
  }
  var FUNCTION$i = any;

  function all(fn, xx) {
    var idx = 0;
    var loop = makeIterable(xx);
    var promised = true;
    while (idx < loop.length && promised) {
      var ref = loop.iterate(idx);
      var value = ref.value;
      var good = fn(value);
      if (!good) { promised = false; }
      idx += 1;
    }
    return promised
  }
  var FUNCTION$j = all;

  function ap(a, b) {
    if (isFunction(a) && isFunction(b)) {
      return function sCombinator(x) {
        return a(x, b(x))
      }
    }
    if (!isArray(a) || !isArray(b))
      { throw new TypeError(
        "Expected to receive an array of functions and an array of values."
      ) }
    if (!a.length || a.filter(isFunction).length !== a.length)
      { throw new TypeError("Expected to receive an array of functions to apply.") }
    return a.reduce(function apReduce(out, fn) {
      return out.concat(b.map(fn))
    }, [])
  }
  var FUNCTION$k = ap;

  function concat(a, b) {
    return a.concat(b)
  }
  var FUNCTION$l = concat;

  function cond(conditions, input) {
    var idx = 0;
    var found = false;
    var match;
    var len = length(conditions);
    while (idx < len && !found) {
      var ref = conditions[idx];
      var test = ref[0];
      var out = ref[1];
      if (test(input)) {
        found = true;
        match = out(input);
      }
      idx += 1;
    }
    return match
  }
  var FUNCTION$m = cond;

  function divide(b, a) {
    return a / b
  }
  var FUNCTION$n = divide;

  function equals(a, b) {
    return a === b
  }
  var FUNCTION$o = equals;

  function filter(fn, xx) {
    var idx = 0;
    var loop = makeIterable(xx);
    var length = loop.length;
    var isArray = loop.isArray;
    var result = isArray ? [] : {};
    while (idx < length) {
      var ref = loop.iterate(idx);
      var key = ref.key;
      var value = ref.value;
      if (fn(value)) {
        if (isArray) {
          result.push(value);
        } else {
          result[key] = value;
        }
      }
      idx += 1;
    }
    return result
  }
  var FUNCTION$p = filter;

  function forEach(fn, xx) {
    var idx = 0;
    var loop = makeIterable(xx);
    var length = loop.length;
    while (idx < length) {
      var ref = loop.iterate(idx);
      var value = ref.value;
      fn(value);
      idx += 1;
    }
  }
  var FUNCTION$q = forEach;

  function includes(a, b) {
    return a.includes(b)
  }
  var FUNCTION$r = includes;

  function greaterThan(b, a) {
    return a > b
  }
  var FUNCTION$s = greaterThan;

  function greaterThanOrEqualTo(b, a) {
    return a >= b
  }
  var FUNCTION$t = greaterThanOrEqualTo;

  function join(del, xx) {
    return xx.join(del)
  }
  var FUNCTION$u = join;

  function lessThan(b, a) {
    return a < b
  }
  var FUNCTION$v = lessThan;

  function lessThanOrEqualTo(b, a) {
    return a <= b
  }
  var FUNCTION$w = lessThanOrEqualTo;

  function map(fn, xx) {
    var idx = 0;
    var loop = makeIterable(xx);
    var length = loop.length;
    var init = loop.init;
    var result = init;
    while (idx < length) {
      var ref = loop.iterate(idx);
      var key = ref.key;
      var value = ref.value;
      result[key] = fn(value);
      idx += 1;
    }
    return result
  }
  var FUNCTION$x = map;

  function multiply(b, a) {
    return a * b
  }
  var FUNCTION$y = multiply;

  function nth(ix, xx) {
    return ix < 0 && xx.length + ix ? xx[xx.length + ix] : xx[ix]
  }
  var FUNCTION$z = nth;

  function or(a, b) {
    return a || b
  }
  var FUNCTION$A = or;

  function range(aa, zz) {
    var out = [];
    var down = zz < aa;
    for (var ix = aa; down ? ix >= zz : ix <= zz; down ? ix-- : ix++) {
      out.push(ix);
    }
    return out
  }
  var FUNCTION$B = range;

  function split(del, xx) {
    return xx.split(del)
  }
  var FUNCTION$C = split;

  function sort(fn, rr) {
    return [].concat(rr).sort(fn)
  }
  var FUNCTION$D = sort;

  function subtract(b, a) {
    return a - b
  }
  var FUNCTION$E = subtract;

  function toJSON(indent, x) {
    return JSON.stringify(x, null, indent)
  }
  var FUNCTION$F = toJSON;

  function extendBinary(F) {
    var BINARY = {
      gt: FUNCTION$s,
      gte: FUNCTION$t,
      lt: FUNCTION$v,
      lte: FUNCTION$w,
      and: FUNCTION$h,
      equals: FUNCTION$o,
      or: FUNCTION$A,
      subtract: FUNCTION$E,
      add: FUNCTION$g,
      divide: FUNCTION$n,
      multiply: FUNCTION$y,
      all: FUNCTION$j,
      any: FUNCTION$i,
      filter: FUNCTION$p,
      forEach: FUNCTION$q,
      includes: FUNCTION$r,
      ap: FUNCTION$k,
      concat: FUNCTION$l,
      map: FUNCTION$x,
      join: FUNCTION$u,
      cond: FUNCTION$m,
      nth: FUNCTION$z,
      range: FUNCTION$B,
      sort: FUNCTION$D,
      split: FUNCTION$C,
      toJSON: FUNCTION$F
    };
    return F.temper(F, BINARY)
  }

  function both(aPred, bPred, x) {
    return aPred(x) && bPred(x)
  }
  var FUNCTION$G = both;

  function either(aPred, bPred, x) {
    return aPred(x) || bPred(x)
  }
  var FUNCTION$H = either;

  function reduce(fn, initial, xx) {
    var loop = makeIterable(xx);
    var idx = 0;
    var length = loop.length;
    var result = initial;
    while (idx < length) {
      var ref = loop.iterate(idx);
      var value = ref.value;
      result = fn(result, value);
      idx += 1;
    }
    return result
  }
  var FUNCTION$I = reduce;

  function slice(aa, bb, xx) {
    return xx.slice(aa, bb)
  }
  var FUNCTION$J = slice;

  function extendTernary(F) {
    var ternaryExtension = {
      both: FUNCTION$G,
      either: FUNCTION$H,
      reduce: FUNCTION$I,
      slice: FUNCTION$J
    };
    return F.temper(F, ternaryExtension)
  }

  function ifElse(condition, yes, no, xx) {
    return condition(xx) ? yes(xx) : no(xx)
  }
  var FUNCTION$K = ifElse;

  function extendQuaternary(F) {
    var quaternaryExtension = {
      ifElse: FUNCTION$K
    };
    return F.temper(F, quaternaryExtension)
  }

  function custom(config) {
    return CORE.pipe(
      fabricate,
      function basicDefinitions(ref) {
        var def = ref.def;
        var curry = ref.curry;
        var curryN = ref.curryN;
        var sideEffectMethods = makeSideEffectsFromEnv(curry);
        var autoCurry = autoCurryUsing(curryN);
        var BASE = CORE.smash(autoCurry(CORE), sideEffectMethods, {
          memoizeWith: memoizeWith,
          def: def,
          curry: curry,
          curryN: curryN,
          C: C,
          $: C.$,
          is: ofConstructor,
          isArray: isArray,
          isBoolean: isBoolean,
          isFunction: isFunction,
          isNumber: isNumber,
          isRawObject: isRawObject,
          isString: isString,
          isSymbol: isSymbol,
          isUndefined: isUndefined,
          isUnmatched: isUnmatched
        });
        return BASE.pipe(
          extendBinary,
          autoCurry,
          extendTernary,
          autoCurry,
          extendQuaternary,
          autoCurry,
          extendDerived,
          makeAliases
        )(BASE)
      }
    )(config)
  }
  var DEFAULT_CONFIG = {
    ts: system,
    check: process.env.NODE_ENV !== "production"
  };
  var FUTILITY = custom(DEFAULT_CONFIG);
  var fUtility = FUTILITY.temper(FUTILITY, { custom: custom, version: PKG.version });

  return fUtility;

})));
