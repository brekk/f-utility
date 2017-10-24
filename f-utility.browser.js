var FUTILITY=function(a){"use strict";function b(a,b){return b={exports:{}},a(b,b.exports),b.exports}function g(){for(var e=arguments,a=arguments.length,b=Array(a),c=0;c<a;++c)b[c]=e[c];return q(b)}var c=Math.floor,d=Math.round,e=b(function(a,b){function c(a){return Array.isArray(a)?a:Array.from(a)}Object.defineProperty(b,"__esModule",{value:!0}),b.pipe=function(){for(var a=arguments,b=arguments.length,c=Array(b),e=0;e<b;++e)c[e]=a[e];return d(c)};var d=b.innerpipe=function(b){return function(d){for(var e=c(b),f=e[0],g=e.slice(1),h=f(d),i=0;i<g.length;i++)h=g[i](h);return h}}}),h=b(function(a,b){Object.defineProperty(b,"__esModule",{value:!0});var c=b.PLACEHOLDER="\uD83C\uDF5B",d=b.$=c}),j=function(d,e){return function(f,a,b){return d.call(e,f,a,b)}},i=function(a,b,c){var d,e=a.length,f=void 0===c?b:j(b,c);for(d=0;d<e;d++)if(f(a[d],d,a))return!0;return!1},k=b(function(a,b){Object.defineProperty(b,"__esModule",{value:!0}),b.curry=void 0;var c=function(a){return a&&a.__esModule?a:{default:a}}(i),d=b.curry=function(a){if("function"!=typeof a)throw new TypeError("Expected to be given a function to curry!");var b=function(a){return a===h.PLACEHOLDER};return function d(){for(var e=arguments,f=arguments.length,g=Array(f),h=0;h<f;++h)g[h]=e[h];var i=(0,c.default)(g,b)?function(a){for(var c=a.length;!b(a[c]);)c--;return c}(g):g.length;return i>=a.length?a.apply(this,g):function(){for(var a=arguments,c=arguments.length,e=Array(c),f=0;f<c;++f)e[f]=a[f];return d.apply(this,g.map(function(a){return b(a)&&e[0]?e.shift():a}).concat(e))}}}}),l=b(function(a,b){Object.defineProperty(b,"__esModule",{value:!0}),b.prop=void 0,b.prop=(0,k.curry)(function(a,b){return b[a]})}),m=b(function(a,b){Object.defineProperty(b,"__esModule",{value:!0}),b.merge=b.values=b.freeze=b.assign=b.keys=void 0;var c=Object.assign,d=Object.keys,e=Object.freeze,f=b.keys=d,g=b.assign=c,h=b.freeze=e,i=b.values=function(a){var b=[];for(var c in a)b.push(a[c]);return b},j=b.merge=(0,k.curry)(function(c,a){return g({},c,a)})}),n=b(function(a,b){Object.defineProperty(b,"__esModule",{value:!0}),b.length=b.objectLength=b.propLength=void 0;var c=b.propLength=(0,l.prop)("length"),d=b.objectLength=(0,e.pipe)(m.keys,c),f=b.length=function(a){return"object"==typeof a?d(a):c(a)}}),o=n.length,p="\uD83C\uDF5B",q=function(a){return function(b){for(var c=a[0],d=a.slice(1),e=c(b),f=0;f<d.length;f++)e=d[f](e);return e}},r=function(c,d){return function(e,f,a){return c.call(d,e,f,a)}},u=function(g,a,b){var c,d=g.length,e=void 0===b?a:r(a,b);for(c=0;c<d;c++)if(e(g[c],c,g))return!0;return!1},v=function(i){if("function"!=typeof i)throw new TypeError("Expected to be given a function to curry!");var j=function(b){return b===p};return function b(){for(var a=arguments,c=arguments.length,k=Array(c),d=0;d<c;++d)k[d]=a[d];var e=u(k,j)?function(b){for(var a=b.length;!j(b[a]);)a--;return a}(k):k.length;return e>=i.length?i.apply(this,k):function(){for(var c=arguments,a=arguments.length,d=Array(a),e=0;e<a;++e)d[e]=c[e];return b.apply(this,k.map(function(b){return j(b)&&d[0]?d.shift():b}).concat(d))}}},x=v(function(e,a){var f=Array.from(a);return f.length?f.map(function(a,b){return e.includes(b)?f[e[b]]:a}):f}),y=v(function(e,a){var b=x(e),c=v(a);return function(){var d=b(Array.from(arguments));return c.apply(null,d)}}),z=v(function(c,a){return a[c]}),A=Object.assign,B=Object.keys,C=B,D=v(function(b,c){return A({},b,c)}),E=z("length"),F=g(C,E),G=function(b){return"object"==typeof b?F(b):E(b)},H=v(function(d,a,b){return b[d](a)}),I=H("filter"),J=v(function(c,a){return c.includes(a)}),K=v(function(c,a){return I(J(c),C(a))}),L=v(function(c,a){return g(K(c),G)(a)}),M=v(function(f,a,b){return function c(d){return f(a,d)?b(d):g(D(d),c)}}),N=function(c,a){return L(c,a)>=G(c)},O=M(N),P=function(c,a){return G(a)>=c},Q=M(P),R=M(function(e,a){var b=e.n,c=e.k;return N(c,a)||P(b,a)}),S=function(a){return c(Math.random()*a)},T=v(function(a,b){return S(b)+a}),U=Object.freeze({floor:S,floorMin:T}),f=v(function(a,b){var c=a,d=[];if("function"!=typeof b||"number"!=typeof c)return d;for(;0<c;)c--,d.push(b());return d}),V=Object.keys,W=v(function(a,b){if(b&&b[0]&&b.length){var c=S(b.length),d=b[c];return a?[d]:d}var e=V(b),f=S(e.length),g=e[f],h=b[g];return a?(i={},i[g]=h,i):h;var i}),X=W(!1),Y=W(!0),Z=v(function(a,b){return f(a,function(){return Y(b)})}),$=Object.freeze({take:W,pick:X,grab:Y,allot:Z}),t=b(function(a,b){function f(){for(var e=arguments,a=arguments.length,b=Array(a),c=0;c<a;++c)b[c]=e[c];return h(b)}Object.defineProperty(b,"__esModule",{value:!0});var g=function(c,d){return function(e,f,a){return c.call(d,e,f,a)}},i=function(h,a,b){var c,d=h.length,e=void 0===b?a:g(a,b);for(c=0;c<d;c++)if(e(h[c],c,h))return!0;return!1},c=function(j){return function(a){return function k(){for(var b=arguments,c=arguments.length,l=Array(c),d=0;d<c;++d)l[d]=b[d];var e=i(l,j)?function(a){for(var b=a.length;!j(a[b]);)b--;return b}(l):l.length;return e>=a.length?a.apply(this,l):function(){for(var a=arguments,b=arguments.length,c=Array(b),d=0;d<b;++d)c[d]=a[d];return k.apply(this,l.map(function(a){return j(a)&&c[0]?c.shift():a}).concat(c))}}}},d="\uD83C\uDF5B",e=function(j){var k=function(b){return b===d};return function b(){for(var a=arguments,c=arguments.length,l=Array(c),d=0;d<c;++d)l[d]=a[d];var e=i(l,k)?function(b){for(var a=b.length;!k(b[a]);)a--;return a}(l):l.length;return e>=j.length?j.apply(this,l):function(){for(var c=arguments,a=arguments.length,d=Array(a),e=0;e<a;++e)d[e]=c[e];return b.apply(this,l.map(function(b){return k(b)&&d[0]?d.shift():b}).concat(d))}}},h=function(a){return function(b){for(var c=a[0],d=a.slice(1),e=c(b),f=0;f<d.length;f++)e=d[f](e);return e}},j=e(function(c,a){return a[c]}),k=Object.assign,l=Object.keys,m=l,n=e(function(b,c){return k({},b,c)}),o=j("length"),p=f(m,o),q=function(b){return o(b)||p(b)},r=e(function(d,a,b){return b[d](a)}),s=r("filter"),t=e(function(c,a){return c.includes(a)}),u=e(function(c,a){return s(t(c),m(a))}),v=e(function(c,a){return f(u(c),q)(a)}),w=e(function(g,a,b){return function c(d){return g(a,d)?b(d):f(n(d),c)}}),x=function(c,a){return v(c,a)>=q(c)},y=w(x),z=function(c,a){return q(a)>=c},A=w(z),B=w(function(e,a){var b=e.n,c=e.k;return x(c,a)||z(b,a)}),C={name:"katsu-curry",version:"0.4.0",description:"curry functions with placeholders or in object form",license:"ISC",main:"katsu-curry.js",reveal:!0,ava:{require:["babel-register"],babel:"inherit"},nyc:{statements:100,branches:100,functions:100,lines:100,reporter:["lcov","json","html","text","text-summary"],exclude:["node_modules","config","coverage","src/*.spec.js","src/*.fixture.js","src/**/index.js","src/index.js","src/combinators.js","src/testing-helper.js","katsu-curry.js","katsu-curry.es.js"],include:["src/*.js","src/**/*.js","!src/*.spec.js"],all:!0,"check-coverage":!0,require:["babel-register"]},scripts:{docs:"nps docs",dependencies:"nps dependencies",readme:"nps readme",lint:"nps lint",test:"nps test",build:"nps build",care:"nps care",precommit:"nps precommit"},dependencies:{"fast.js":"^0.1.1"},devDependencies:{"babel-cli":"^6.24.1","babel-plugin-istanbul":"^4.1.4","babel-plugin-transform-es2015-destructuring":"^6.23.0","babel-plugin-transform-object-rest-spread":"^6.23.0","babel-preset-es2015":"^6.24.1","babel-register":"^6.24.1",benchmark:"^2.1.4",bluebird:"^3.5.0",depcheck:"^0.6.7",documentation:"^4.0.0-rc.1",eslint:"^3.12.2","eslint-config-standard":"^6.2.1","eslint-plugin-babel":"^4.1.1","eslint-plugin-better":"^0.1.5","eslint-plugin-eslint-comments":"^1.0.2","eslint-plugin-fp":"^2.3.0","eslint-plugin-import":"^2.6.1","eslint-plugin-promise":"^3.4.0","eslint-plugin-standard":"^2.0.1",execa:"^0.8.0",husky:"^0.14.2",istanbul:"0.4.x",jayin:"^0.0.3",jest:"^20.0.4","katsu-curry":"^0.1.1",madge:"^2.0.0",microtime:"^2.1.6",nps:"^5.5.0","nps-utils":"^1.2.0",nyc:"^11.0.3",ramda:"^0.24.1",rollup:"^0.43.0","rollup-plugin-babili":"^3.1.0","rollup-plugin-buble":"^0.15.0","rollup-plugin-cleanup":"^1.0.1","rollup-plugin-commonjs":"^8.0.2","rollup-plugin-istanbul":"^1.1.0","rollup-plugin-json":"^2.3.0","rollup-plugin-node-resolve":"^3.0.0","rollup-plugin-progress":"^0.4.0",testperf:"^2.0.3"},repository:"https://github.com/brekk/katsu-curry",author:"brekk"}.version,D=d;b.pipe=f,b.compose=function(){for(var e=arguments,a=arguments.length,b=Array(a),c=0;c<a;++c)b[c]=e[c];return h(b.reverse())},b.version=C,b.$=D,b.PLACEHOLDER=D,b.curryify=function(b){return c(b)},b.curry=e,b.curryObjectK=y,b.curryObjectN=A,b.curryObjectKN=B,b.K=function(b){return function(){return b}},b.I=function(b){return b}}),_=b(function(a,b){Object.defineProperty(b,"__esModule",{value:!0});var f=t.curry(function(c,a){return a[c]()}),g=t.curry(function(d,b,c){return c[d](b)}),h=t.curry(function(e,c,d,a){return a[e](c,d)}),i=t.curry(function(f,d,e,a,b){return b[f](d,e,a)}),j=t.curry(function(g,e,f,a,b,c){return c[g](e,f,a,b)}),k=t.curry(function(h,f,g,a,b,c,d){return d[h](f,g,a,b,c)}),l=t.curry(function(i,g,h,a,b,c,d,e){return e[i](g,h,a,b,c,d)}),m=t.curry(function(j,h,i,a,b,c,d,e,f){return f[j](h,i,a,b,c,d,e)}),n=t.curry(function(k,i,j,a,b,c,d,e,f,g){return g[k](i,j,a,b,c,d,e,f)}),o=t.curry(function(l,j,k,a,b,c,d,e,f,g,h){return h[l](j,k,a,b,c,d,e,f,g)}),p=t.curry(function(m,k,l,a,b,c,d,e,f,g,h,i){return i[m](k,l,a,b,c,d,e,f,g,h)}),d=t.curry(function(q,a,b,c){var d=[a].concat(b,[c]);return[f,g,h,i,j,k,l,m,n,o,p][q].apply(null,d)}),c=t.curry(function(f,b,c,e){if(f!==c.length)throw new Error(b+" expects total args ("+c.length+") to equal the given arity ("+f+")");return d(f,b,c,e)});b.e0=f,b.e1=g,b.e2=h,b.e3=i,b.e4=j,b.e5=k,b.e6=l,b.e7=m,b.e8=n,b.e9=o,b.e10=p,b.eN=d,b.eD=c}),aa=_.e0,ba=_.e1,ca=_.e2,da=function(a,b,c){var d,e=a.length,f=[],g=void 0===c?b:j(b,c);for(d=0;d<e;d++)g(a[d],d,a)&&f.push(a[d]);return f},ea=function(a,b,c){var d,e,f=Object.keys(a),g=f.length,h={},i=void 0===c?b:j(b,c);for(d=0;d<g;d++)e=f[d],i(a[e],e,a)&&(h[e]=a[e]);return h},fa=v(function(a,b){return!!b[a]}),ga=Array.isArray,ha=v(function(a,b){return fa(a,b)&&!ga(b)}),ia=v(function(a,b,c,d){return ha(a,d)?ba(a,c,d):b(d,c)}),ja=v(function(a,b,c,d,e){return ha(a,e)?ca(a,c,d,e):b(e,c,d)}),ka=ia("filter",function(a,b,c){return a instanceof Array?da(a,b,c):ea(a,b,c)}),la=ba("join"),ma=ba("concat"),na=v(function(a,b){var c=Array.from(b);return c.sort(a),c}),oa=v(function(a,b){return ka(function(b){return!a.includes(b)},b)}),pa=v(function(c,a){var b=oa(c,a),d=oa(a,c);return b.length>d.length?b:d}),qa=v(function(a,b,c){var d=Array.from(c),e=0<a?a:d.length-Math.abs(a);return d[e]=b(d[e]),d}),ra=qa(0),sa=qa(-1),ta=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],ua=v(function(a,b){return g(Z(b),la(""))(a)}),va=Object.freeze({wordSource:ua,word:function(a){return void 0===a&&(a=5),ua(ta,a)}}),w=Object.freeze({shuffle:function(a){for(var b=[].concat(a),d=b.length;0<d--;){var e=c(Math.random()*d+1),f=b[e],g=b[d];b[e]=g,b[d]=f}return b}}),s=v(function(c,d,b){return c(b,d)?b:d}),wa=function(c){return v(function(d,a){return c(a,d)})},xa=ca("fork"),ya=function(a,b,c){var d,e=a.length,f=Array(e),g=void 0===c?b:j(b,c);for(d=0;d<e;d++)f[d]=g(a[d],d,a);return f},za=function(a,b,c){var d,e,f=Object.keys(a),g=f.length,h={},i=void 0===c?b:j(b,c);for(d=0;d<g;d++)e=f[d],h[e]=i(a[e],e,a);return h},Aa=function(a,b,c){return a instanceof Array?ya(a,b,c):za(a,b,c)},Ba=v(function(a,b){return b&&!Array.isArray(b)&&b.map?b.map(a):Aa(b,a)}),Ca=v(function(a,b){return a===typeof b}),Da=Ca("boolean"),Ea=Ca("number"),Fa=Ca("function"),Ga=Ca("string"),Ha=function(a){return null==a},Ia=Ca("object"),Ja=Array.isArray,Ka=function(e,f){return function(g,a,b,c){return e.call(f,g,a,b,c)}},La=function(a,b,c,d){var e,f,g=a.length,h=void 0===d?b:Ka(b,d);for(void 0===c?(e=1,f=a[0]):(e=0,f=c);e<g;e++)f=h(f,a[e],e,a);return f},Ma=function(a,b,c,d){var e,f,g,h=Object.keys(a),i=h.length,j=void 0===d?b:Ka(b,d);for(void 0===c?(e=1,g=a[h[0]]):(e=0,g=c);e<i;e++)f=h[e],g=j(g,a[f],f,a);return g},Na=ja("reduce",function(a,b,c,d){return a instanceof Array?La(a,b,c,d):Ma(a,b,c,d)}),Oa=v(function(a,b){return b&&b.ap&&Fa(b.ap)?b.ap(a):Fa(b)?function(c){return a(c)(b(c))}:Na(function(a,c){return a.concat(Ba(c,b))},[],a)}),Pa=ca("fold"),Qa=b(function(a){var b=function(b){return b.reduce(function(a,b){return a.concat(b)})};a.exports=function(c,a){return a?b(c.map(a)):b(c)}}),Ra=ia("chain",Qa),Sa=v(function(c,a){return c===a}),Ta=v(function(c,b){return b>c}),Ua=v(function(c,b){return b>=c}),Va=v(function(c,b){return b<c}),Wa=v(function(c,b){return b<=c}),Xa=v(function(c,a){return a+c}),Ya=v(function(c,a){return a-c}),Za=v(function(c,a){return a*c}),$a=v(function(c,a){return a/c}),_a=v(function(c,a){return Math.pow(a,c)}),ab=function(a){return!a},bb=v(function(b,c){return g(b(c),ab)}),cb=v(function(c,d,a){return g(c(d,a),ab)}),db=v(function(d,e,a,b){return g(d(e,a,b),ab)}),eb=v(function(a,b){return ka(function(b){return!a(b)},b)}),fb=aa("trim"),gb=ba("charAt"),hb=ba("codePointAt"),ib=ba("match"),jb=ba("repeat"),kb=ba("search"),lb=ba("split"),mb=ca("endsWith"),nb=v(function(a,b){return mb(a,b.length,b)}),ob=ca("indexOf"),pb=v(function(a,b){return ob(a,0,b)}),qb=ca("lastIndexOf"),rb=v(function(a,b){return qb(a,Infinity,b)}),sb=ca("padEnd"),tb=ca("padStart"),ub=ca("replace"),vb=ca("startsWith"),wb=v(function(a,b){return vb(a,0,b)}),xb=ca("substr"),yb=v(function(c,d,b){return c?b:d}),zb=v(function(a,b,c,d){return a(d)?c(d):b(d)}),Ab=v(function(c,d){for(var e=[],f=c<d,g=f?[c,d]:[d+1,c+1],h=g[0],a=g[1],b=h;b<a;b++)e.push(b);return f?e:e.reverse()}),Bb=Object.keys,Cb=Object.freeze,Db=Object.assign,Eb=Bb,Fb=Db,Gb=v(function(c,a){return Fb({},c,a)}),Hb=function(a){return g(Eb,Ba(function(b){return[b,a[b]]}))(a)},Ib=Hb,Jb=Na(function(a,b){var c=b[0],d=b[1];return Gb(a,(e={},e[c]=d,e));var e},{}),Kb=v(function(a,b){return g(Ib,Ba(a),Jb)(b)}),Lb=v(function(a,b){return Kb(function(b){var c=b[0],d=b[1];return[c,a(d)]},b)}),Mb=v(function(a,b){return Kb(function(b){var c=b[0],d=b[1];return[a(c),d]},b)}),Nb=v(function(a,b,c){return Na(function(b,c){return b[c]||a},c,b)}),Ob=Nb(null),Pb=v(function(a,b,c){return Nb(a,[b],c)}),Qb=Pb(null),Rb=v(function(a,b,c){return g(Ob(b),a,Boolean)(c)}),Sb=v(function(a,b,c){return Rb(Sa(a),b,c)}),Tb=v(function(a,b,c){return g(Qb([b]),a,Boolean)(c)}),Ub=v(function(a,b,c){return Rb(Sa(a),[b],c)}),Vb=Object.keys,Wb=v(function(a,b,c){var d=wa(a);return zb(Array.isArray,d(b),g(Vb,d(function(a){return b(c[a],a)})),c)}),Xb=Wb(i),Yb=Wb(function(a,b,c){var d,e=a.length,f=void 0===c?b:j(b,c);for(d=0;d<e;d++)if(!f(a[d],d,a))return!1;return!0}),Zb=Object.assign(function(a){return void 0===a&&(a=1),d(Math.random()*a)},U,$,va,w);return a.version="3.3.5",a.length=o,a.random=Zb,a.pipe=g,a.compose=function(){for(var e=arguments,a=arguments.length,b=Array(a),c=0;c<a;++c)b[c]=e[c];return q(b.reverse())},a.$=p,a.PLACEHOLDER=p,a.curryify=function(i){if("function"!=typeof i)throw new TypeError("Expected to be given a function to test placeholders!");return function(a){if("function"!=typeof a)throw new TypeError("Expected to be given a function to curry!");return function j(){for(var b=arguments,c=arguments.length,k=Array(c),d=0;d<c;++d)k[d]=b[d];var e=u(k,i)?function(a){for(var b=a.length;!i(a[b]);)b--;return b}(k):k.length;return e>=a.length?a.apply(this,k):function(){for(var a=arguments,b=arguments.length,c=Array(b),d=0;d<b;++d)c[d]=a[d];return j.apply(this,k.map(function(a){return i(a)&&c[0]?c.shift():a}).concat(c))}}}},a.curry=v,a.curryObjectK=O,a.curryObjectN=Q,a.curryObjectKN=R,a.remap=y,a.remapArray=x,a.K=function(b){return function(){return b}},a.I=function(b){return b},a.concat=ma,a.join=la,a.sort=na,a.symmetricDifference=pa,a.difference=oa,a.alterIndex=qa,a.alterFirstIndex=ra,a.alterLastIndex=sa,a.choice=s,a.filter=ka,a.flip=wa,a.fork=xa,a.iterate=f,a.map=Ba,a.ap=Oa,a.fold=Pa,a.chain=Ra,a.flatMap=Ra,a.equals=Sa,a.equal=Sa,a.round=d,a.add=Xa,a.subtract=Ya,a.divide=$a,a.multiply=Za,a.pow=_a,a.invert=ab,a.not=function(a){return g(a,ab)},a.not1=bb,a.not2=cb,a.not3=db,a.reduce=Na,a.reject=eb,a.charAt=gb,a.codePointAt=hb,a.endsWith=nb,a.indexOf=pb,a.lastIndexOf=rb,a.match=ib,a.padEnd=sb,a.padStart=tb,a.repeat=jb,a.replace=ub,a.search=kb,a.split=lb,a.startsWith=wb,a.substr=xb,a.trim=fb,a.ternary=yb,a.triplet=zb,a.range=Ab,a.keys=Eb,a.assign=Fb,a.freeze=Cb,a.merge=Gb,a.entries=Hb,a.fromPairs=Jb,a.toPairs=Ib,a.mapTuple=Kb,a.mapTuples=Kb,a.mapValues=Lb,a.mapKeys=Mb,a.path=Ob,a.pathOr=Nb,a.prop=Qb,a.propOr=Pb,a.pathEq=Sb,a.pathIs=Rb,a.propIs=Tb,a.propEq=Ub,a.isTypeof=Ca,a.isBoolean=Da,a.isNumber=Ea,a.isFunction=Fa,a.isString=Ga,a.isObject=Ia,a.isNil=Ha,a.isArray=Ja,a.isDistinctObject=function(a){return!Ha(a)&&Ia(a)&&!Ja(a)},a.which=Wb,a.some=Xb,a.every=Yb,a}({});
