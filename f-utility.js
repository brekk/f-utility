'use strict';Object.defineProperty(exports,'__esModule',{value:!0});function _interopDefault(a){return a&&'object'==typeof a&&'default'in a?a['default']:a}var katsuCurry=require('katsu-curry'),entrust=require('entrust'),_flatMap=_interopDefault(require('flatmap-fast'));function createCommonjsModule(a,b){return b={exports:{}},a(b,b.exports),b.exports}var constant=createCommonjsModule(function(a,b){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var c=b.PLACEHOLDER='\uD83C\uDF5B',d=b.$=c});var bindInternal3=function(d,e){return function(f,a,b){return d.call(e,f,a,b)}};var some=function(a,b,c){var d,e=a.length,f=c===void 0?b:bindInternal3(b,c);for(d=0;d<e;d++)if(f(a[d],d,a))return!0;return!1},katsu=createCommonjsModule(function(a,b){'use strict';Object.defineProperty(b,'__esModule',{value:!0}),b.curry=void 0;var c=function(a){return a&&a.__esModule?a:{default:a}}(some),d=b.curry=function(a){var b=function(a){return a===constant.PLACEHOLDER};return function d(){for(var e=arguments,f=arguments.length,g=Array(f),h=0;h<f;++h)g[h]=e[h];var i=(0,c.default)(g,b)?function(a){for(var c=a.length;!b(a[c]);)c--;return c}(g):g.length;return i>=a.length?a.apply(this,g):function(){for(var a=arguments,c=arguments.length,e=Array(c),f=0;f<c;++f)e[f]=a[f];return d.apply(this,g.map(function(a){return b(a)&&e[0]?e.shift():a}).concat(e))}}}}),pipe_1=createCommonjsModule(function(a,b){'use strict';function c(a){return Array.isArray(a)?a:Array.from(a)}Object.defineProperty(b,'__esModule',{value:!0}),b.innerpipe=void 0,b.pipe=function(){for(var a=arguments,b=arguments.length,c=Array(b),e=0;e<b;++e)c[e]=a[e];return d(c)};var d=b.innerpipe=function(b){return function(d){for(var e=c(b),f=e[0],g=e.slice(1),h=f(d),i=0;i<g.length;i++)h=g[i](h);return h}}}),prop_1=createCommonjsModule(function(a,b){'use strict';Object.defineProperty(b,'__esModule',{value:!0}),b.prop=void 0;b.prop=(0,katsu.curry)(function(a,b){return b[a]})}),object=createCommonjsModule(function(a,b){'use strict';Object.defineProperty(b,'__esModule',{value:!0}),b.merge=b.values=b.freeze=b.assign=b.keys=void 0;var c=Object.assign,d=Object.keys,e=Object.freeze,f=b.keys=d,g=b.assign=c,h=b.freeze=e,i=b.values=function(a){var b=[];for(var c in a)b.push(a[c]);return b},j=b.merge=(0,katsu.curry)(function(c,a){return g({},c,a)})}),length_1=createCommonjsModule(function(a,b){'use strict';Object.defineProperty(b,'__esModule',{value:!0}),b.length=void 0;var c=(0,prop_1.prop)('length'),d=(0,pipe_1.pipe)(object.keys,c),e=b.length=function(a){return c(a)||d(a)}}),length_2=length_1.length,version$1='3.3.4',random$1=function(a){return void 0===a&&(a=1),Math.round(Math.random()*a)},floor=function(a){return Math.floor(Math.random()*a)},floorMin=katsuCurry.curry(function(a,b){return floor(b)+a}),f=Object.freeze({floor:floor,floorMin:floorMin}),iterate=katsuCurry.curry(function(a,b){var c=a,d=[];if('function'!=typeof b||'number'!=typeof c)return d;for(;0<c;)c--,d.push(b());return d}),keys=Object.keys,take=katsuCurry.curry(function(a,b){if(b&&b[0]&&b.length){var c=floor(b.length),d=b[c];return a?[d]:d}var e=keys(b),f=floor(e.length),g=e[f],h=b[g];return a?(i={},i[g]=h,i):h;var i}),pick=take(!1),grab=take(!0),allot=katsuCurry.curry(function(a,b){return iterate(a,function(){return grab(b)})}),t=Object.freeze({take:take,pick:pick,grab:grab,allot:allot});var filter$2=function(a,b,c){var d,e=a.length,f=[],g=c===void 0?b:bindInternal3(b,c);for(d=0;d<e;d++)g(a[d],d,a)&&f.push(a[d]);return f};var filter$4=function(a,b,c){var d,e,f=Object.keys(a),g=f.length,h={},i=c===void 0?b:bindInternal3(b,c);for(d=0;d<g;d++)e=f[d],i(a[e],e,a)&&(h[e]=a[e]);return h};var filter$1=function(a,b,c){return a instanceof Array?filter$2(a,b,c):filter$4(a,b,c)},has=katsuCurry.curry(function(a,b){return!!b[a]}),isArray=Array.isArray,willDelegate=katsuCurry.curry(function(a,b){return has(a,b)&&!isArray(b)}),delegateFastBinary=katsuCurry.curry(function(a,b,c,d){return willDelegate(a,d)?entrust.e1(a,c,d):b(d,c)}),delegateFastTertiary=katsuCurry.curry(function(a,b,c,d,e){return willDelegate(a,e)?entrust.e2(a,c,d,e):b(e,c,d)}),filter=delegateFastBinary('filter',filter$1),join=entrust.e1('join'),concat=entrust.e1('concat'),sort=katsuCurry.curry(function(a,b){var c=Array.from(b);return c.sort(a),c}),difference=katsuCurry.curry(function(a,b){return filter(function(b){return!a.includes(b)},b)}),symmetricDifference=katsuCurry.curry(function(c,a){var b=difference(c,a),d=difference(a,c);return b.length>d.length?b:d}),alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],wordSource=katsuCurry.curry(function(a,b){return katsuCurry.pipe(allot(b),join(''))(a)}),word=function(a){return void 0===a&&(a=5),wordSource(alphabet,a)},w=Object.freeze({wordSource:wordSource,word:word}),shuffle=function(a){for(var b=[].concat(a),c=b.length;0<c--;){var d=Math.floor(Math.random()*c+1),e=b[d],f=b[c];b[d]=f,b[c]=e}return b},s=Object.freeze({shuffle:shuffle}),choice=katsuCurry.curry(function(c,d,b){return c(b,d)?b:d}),flip=function(c){return katsuCurry.curry(function(d,a){return c(a,d)})},fork=entrust.e2('fork');var map$2=function(a,b,c){var d,e=a.length,f=Array(e),g=c===void 0?b:bindInternal3(b,c);for(d=0;d<e;d++)f[d]=g(a[d],d,a);return f};var map$4=function(a,b,c){var d,e,f=Object.keys(a),g=f.length,h={},i=c===void 0?b:bindInternal3(b,c);for(d=0;d<g;d++)e=f[d],h[e]=i(a[e],e,a);return h};var map$1=function(a,b,c){return a instanceof Array?map$2(a,b,c):map$4(a,b,c)},map=katsuCurry.curry(function(a,b){return b&&!Array.isArray(b)&&b.map?b.map(a):map$1(b,a)}),isTypeof=katsuCurry.curry(function(a,b){return a===typeof b}),isBoolean=isTypeof('boolean'),isNumber=isTypeof('number'),isFunction=isTypeof('function'),isString=isTypeof('string'),isNil=function(a){return null==a},isObject=isTypeof('object'),isArray$1=Array.isArray,isDistinctObject=function(a){return!isNil(a)&&isObject(a)&&!isArray$1(a)};var bindInternal4=function(e,f){return function(g,a,b,c){return e.call(f,g,a,b,c)}};var reduce$2=function(a,b,c,d){var e,f,g=a.length,h=d===void 0?b:bindInternal4(b,d);for(void 0===c?(e=1,f=a[0]):(e=0,f=c);e<g;e++)f=h(f,a[e],e,a);return f};var reduce$4=function(a,b,c,d){var e,f,g,h=Object.keys(a),i=h.length,j=d===void 0?b:bindInternal4(b,d);for(void 0===c?(e=1,g=a[h[0]]):(e=0,g=c);e<i;e++)f=h[e],g=j(g,a[f],f,a);return g};var reduce$1=function(a,b,c,d){return a instanceof Array?reduce$2(a,b,c,d):reduce$4(a,b,c,d)},reduce=delegateFastTertiary('reduce',reduce$1),ap=katsuCurry.curry(function(a,b){return b&&b.ap&&isFunction(b.ap)?b.ap(a):isFunction(b)?function(c){return a(c)(b(c))}:reduce(function(a,c){return a.concat(map(c,b))},[],a)}),fold=entrust.e2('fold'),chain=delegateFastBinary('chain',_flatMap),flatMap=chain,equals=katsuCurry.curry(function(c,a){return c===a}),equal=equals,round=Math.round,add=katsuCurry.curry(function(c,a){return a+c}),subtract=katsuCurry.curry(function(c,a){return a-c}),multiply=katsuCurry.curry(function(c,a){return a*c}),divide=katsuCurry.curry(function(c,a){return a/c}),pow=katsuCurry.curry(function(c,a){return Math.pow(a,c)}),invert=function(a){return!a},not=function(a){return katsuCurry.pipe(a,invert)},not1=katsuCurry.curry(function(b,c){return katsuCurry.pipe(b(c),invert)}),not2=katsuCurry.curry(function(c,d,a){return katsuCurry.pipe(c(d,a),invert)}),not3=katsuCurry.curry(function(d,e,a,b){return katsuCurry.pipe(d(e,a,b),invert)}),reject=katsuCurry.curry(function(a,b){return filter(function(b){return!a(b)},b)}),trim=entrust.e0('trim'),charAt=entrust.e1('charAt'),codePointAt=entrust.e1('codePointAt'),match=entrust.e1('match'),repeat=entrust.e1('repeat'),search=entrust.e1('search'),split=entrust.e1('split'),endsWithLength=entrust.e2('endsWith'),endsWith=katsuCurry.curry(function(a,b){return endsWithLength(a,b.length,b)}),indexOfFromIndex=entrust.e2('indexOf'),indexOf=katsuCurry.curry(function(a,b){return indexOfFromIndex(a,0,b)}),lastIndexOfFromIndex=entrust.e2('lastIndexOf'),lastIndexOf=katsuCurry.curry(function(a,b){return lastIndexOfFromIndex(a,Infinity,b)}),padEnd=entrust.e2('padEnd'),padStart=entrust.e2('padStart'),replace=entrust.e2('replace'),startsWithFromPosition=entrust.e2('startsWith'),startsWith=katsuCurry.curry(function(a,b){return startsWithFromPosition(a,0,b)}),substr=entrust.e2('substr'),ternary=katsuCurry.curry(function(c,d,b){return c?b:d}),triplet=katsuCurry.curry(function(a,b,c,d){return a(d)?c(d):b(d)}),range=katsuCurry.curry(function(c,d){for(var e=[],f=c<d,g=f?[c,d]:[d+1,c+1],h=g[0],a=g[1],b=h;b<a;b++)e.push(b);return f?e:e.reverse()}),_keys=Object.keys,_freeze=Object.freeze,_assign=Object.assign,keys$1=_keys,freeze=_freeze,assign=_assign,merge=katsuCurry.curry(function(c,a){return assign({},c,a)}),entries=function(a){return katsuCurry.pipe(keys$1,map(function(b){return[b,a[b]]}))(a)},toPairs=entries,fromPairs=reduce(function(a,b){var c=b[0],d=b[1];return merge(a,(e={},e[c]=d,e));var e},{}),pathOr=katsuCurry.curry(function(a,b,c){return reduce(function(b,c){return b[c]||a},c,b)}),path=pathOr(null),propOr=katsuCurry.curry(function(a,b,c){return pathOr(a,[b],c)}),prop$1=propOr(null),pathIs=katsuCurry.curry(function(a,b,c){return katsuCurry.pipe(path(b),a,Boolean)(c)}),pathEq=katsuCurry.curry(function(a,b,c){return pathIs(equals(a),b,c)}),propIs=katsuCurry.curry(function(a,b,c){return katsuCurry.pipe(prop$1([b]),a,Boolean)(c)}),propEq=katsuCurry.curry(function(a,b,c){return pathIs(equals(a),[b],c)});var every$1=function(a,b,c){var d,e=a.length,f=c===void 0?b:bindInternal3(b,c);for(d=0;d<e;d++)if(!f(a[d],d,a))return!1;return!0},keys$2=Object.keys,which=katsuCurry.curry(function(a,b,c){var d=flip(a);return triplet(Array.isArray,d(b),katsuCurry.pipe(keys$2,d(function(a){return b(c[a],a)})),c)}),some$1=which(some),every=which(every$1),version=version$1,length$$1=length_2,random$$1=Object.assign(random$1,f,t,w,s);exports.version=version,exports.length=length$$1,exports.random=random$$1,exports.pipe=katsuCurry.pipe,exports.compose=katsuCurry.compose,exports.$=katsuCurry.$,exports.PLACEHOLDER=katsuCurry.PLACEHOLDER,exports.curryify=katsuCurry.curryify,exports.curry=katsuCurry.curry,exports.curryObjectK=katsuCurry.curryObjectK,exports.curryObjectN=katsuCurry.curryObjectN,exports.curryObjectKN=katsuCurry.curryObjectKN,exports.K=katsuCurry.K,exports.I=katsuCurry.I,exports.concat=concat,exports.join=join,exports.sort=sort,exports.symmetricDifference=symmetricDifference,exports.difference=difference,exports.choice=choice,exports.filter=filter,exports.flip=flip,exports.fork=fork,exports.iterate=iterate,exports.map=map,exports.ap=ap,exports.fold=fold,exports.chain=chain,exports.flatMap=flatMap,exports.equals=equals,exports.equal=equal,exports.round=round,exports.add=add,exports.subtract=subtract,exports.divide=divide,exports.multiply=multiply,exports.pow=pow,exports.invert=invert,exports.not=not,exports.not1=not1,exports.not2=not2,exports.not3=not3,exports.reduce=reduce,exports.reject=reject,exports.charAt=charAt,exports.codePointAt=codePointAt,exports.endsWith=endsWith,exports.indexOf=indexOf,exports.lastIndexOf=lastIndexOf,exports.match=match,exports.padEnd=padEnd,exports.padStart=padStart,exports.repeat=repeat,exports.replace=replace,exports.search=search,exports.split=split,exports.startsWith=startsWith,exports.substr=substr,exports.trim=trim,exports.ternary=ternary,exports.triplet=triplet,exports.range=range,exports.keys=keys$1,exports.assign=assign,exports.freeze=freeze,exports.merge=merge,exports.entries=entries,exports.fromPairs=fromPairs,exports.toPairs=toPairs,exports.path=path,exports.pathOr=pathOr,exports.prop=prop$1,exports.propOr=propOr,exports.pathEq=pathEq,exports.pathIs=pathIs,exports.propIs=propIs,exports.propEq=propEq,exports.isTypeof=isTypeof,exports.isBoolean=isBoolean,exports.isNumber=isNumber,exports.isFunction=isFunction,exports.isString=isString,exports.isObject=isObject,exports.isNil=isNil,exports.isArray=isArray$1,exports.isDistinctObject=isDistinctObject,exports.which=which,exports.some=some$1,exports.every=every;
