(function(a,b){'object'==typeof exports&&'undefined'!=typeof module?b(exports):'function'==typeof define&&define.amd?define(['exports'],b):b(a.FUTILITY={})})(this,function(a){'use strict';function g(){for(var e=arguments,a=arguments.length,b=Array(a),c=0;c<a;++c)b[c]=e[c];return j(b)}function b(){for(var e=arguments,a=arguments.length,b=Array(a),c=0;c<a;++c)b[c]=e[c];return j(b.reverse())}function c(a,b){return b={exports:{}},a(b,b.exports),b.exports}var d=Math.floor,e=Math.round,h='\uD83C\uDF5B',i=h,j=function(a){return function(b){for(var c=a[0],d=a.slice(1),e=c(b),f=0;f<d.length;f++)e=d[f](e);return e}},k=function(b){return function(){return b}},l=function(b){return b},m=function(c,d){return function(e,f,a){return c.call(d,e,f,a)}},n=function(g,a,b){var c,d=g.length,e=void 0===b?a:m(a,b);for(c=0;c<d;c++)if(e(g[c],c,g))return!0;return!1},o=function(i){if('function'!=typeof i)throw new TypeError('Expected to be given a function to curry!');var j=function(b){return b===h};return function b(){for(var a=arguments,c=arguments.length,k=Array(c),d=0;d<c;++d)k[d]=a[d];var e=n(k,j)?function(b){for(var a=b.length;!j(b[a]);)a--;return a}(k):k.length;return e>=i.length?i.apply(this,k):function(){for(var c=arguments,a=arguments.length,d=Array(a),e=0;e<a;++e)d[e]=c[e];return b.apply(this,k.map(function(b){return j(b)&&d[0]?d.shift():b}).concat(d))}}},p=function(i){if('function'!=typeof i)throw new TypeError('Expected to be given a function to test placeholders!');return function(a){if('function'!=typeof a)throw new TypeError('Expected to be given a function to curry!');return function j(){for(var b=arguments,c=arguments.length,k=Array(c),d=0;d<c;++d)k[d]=b[d];var e=n(k,i)?function(a){for(var b=a.length;!i(a[b]);)b--;return b}(k):k.length;return e>=a.length?a.apply(this,k):function(){for(var a=arguments,b=arguments.length,c=Array(b),d=0;d<b;++d)c[d]=a[d];return j.apply(this,k.map(function(a){return i(a)&&c[0]?c.shift():a}).concat(c))}}}},q=o(function(e,a){var f=Array.from(a);return f.length?f.map(function(a,b){return e.includes(b)?f[e[b]]:a}):f}),r=o(function(e,a){var b=q(e),c=o(a);return function(){var d=b(Array.from(arguments));return c.apply(null,d)}}),u=o(function(c,a){return a[c]}),v=Object.assign,x=Object.keys,y=x,z=o(function(b,c){return v({},b,c)}),A=u('length'),B=g(y,A),C=function(b){return'object'==typeof b?B(b):A(b)},D=o(function(d,a,b){return b[d](a)}),E=D('filter'),F=o(function(c,a){return c.includes(a)}),G=o(function(c,a){return E(F(c),y(a))}),H=o(function(c,a){return g(G(c),C)(a)}),I=o(function(f,a,b){return function c(d){return f(a,d)?b(d):g(z(d),c)}}),J=function(c,a){return H(c,a)>=C(c)},K=I(J),L=function(c,a){return C(a)>=c},M=I(L),N=I(function(e,a){var b=e.n,c=e.k;return J(c,a)||L(b,a)}),O=Object.freeze({$:i,PLACEHOLDER:h,compose:b,pipe:g,version:'0.6.0',K:k,I:l,curry:o,curryify:p,remap:r,remapArray:q,curryObjectK:K,curryObjectN:M,curryObjectKN:N}),P=function(a){return d(Math.random()*a)},Q=o(function(a,b){return P(b)+a}),R=Object.freeze({floor:P,floorMin:Q}),f=o(function(a,b){var c=a,d=[];if('function'!=typeof b||'number'!=typeof c)return d;for(;0<c;)c--,d.push(b());return d}),S=Object.keys,T=o(function(a,b){if(b&&b[0]&&b.length){var c=P(b.length),d=b[c];return a?[d]:d}var e=S(b),f=P(e.length),g=e[f],h=b[g];return a?(i={},i[g]=h,i):h;var i}),U=T(!1),V=T(!0),W=o(function(a,b){return f(a,function(){return V(b)})}),X=Object.freeze({take:T,pick:U,grab:V,allot:W}),t=O,Y=c(function(a,b){Object.defineProperty(b,'__esModule',{value:!0});var f=t.curry(function(c,a){return a[c]()}),g=t.curry(function(d,b,c){return c[d](b)}),h=t.curry(function(e,c,d,a){return a[e](c,d)}),i=t.curry(function(f,d,e,a,b){return b[f](d,e,a)}),j=t.curry(function(g,e,f,a,b,c){return c[g](e,f,a,b)}),k=t.curry(function(h,f,g,a,b,c,d){return d[h](f,g,a,b,c)}),l=t.curry(function(i,g,h,a,b,c,d,e){return e[i](g,h,a,b,c,d)}),m=t.curry(function(j,h,i,a,b,c,d,e,f){return f[j](h,i,a,b,c,d,e)}),n=t.curry(function(k,i,j,a,b,c,d,e,f,g){return g[k](i,j,a,b,c,d,e,f)}),o=t.curry(function(l,j,k,a,b,c,d,e,f,g,h){return h[l](j,k,a,b,c,d,e,f,g)}),p=t.curry(function(m,k,l,a,b,c,d,e,f,g,h,i){return i[m](k,l,a,b,c,d,e,f,g,h)}),d=t.curry(function(q,a,b,c){var d=[a].concat(b,[c]);return[f,g,h,i,j,k,l,m,n,o,p][q].apply(null,d)}),c=t.curry(function(f,b,c,e){if(f!==c.length)throw new Error(b+' expects total args ('+c.length+') to equal the given arity ('+f+')');return d(f,b,c,e)});b.e0=f,b.e1=g,b.e2=h,b.e3=i,b.e4=j,b.e5=k,b.e6=l,b.e7=m,b.e8=n,b.e9=o,b.e10=p,b.eN=d,b.eD=c});(function(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,'default')?a['default']:a})(Y);var Z=Y.e0,$=Y.e1,_=Y.e2;var aa=function(d,e){return function(f,a,b){return d.call(e,f,a,b)}};var ba=function(a,b,c){var d,e=a.length,f=[],g=c===void 0?b:aa(b,c);for(d=0;d<e;d++)g(a[d],d,a)&&f.push(a[d]);return f};var ca=function(a,b,c){var d,e,f=Object.keys(a),g=f.length,h={},i=c===void 0?b:aa(b,c);for(d=0;d<g;d++)e=f[d],i(a[e],e,a)&&(h[e]=a[e]);return h};var da=o(function(a,b){return!!b[a]}),ea=Array.isArray,fa=o(function(a,b){return da(a,b)&&!ea(b)}),ga=o(function(a,b,c,d){return fa(a,d)?$(a,c,d):b(d,c)}),ha=o(function(a,b,c,d,e){return fa(a,e)?_(a,c,d,e):b(e,c,d)}),ia=ga('filter',function(a,b,c){return a instanceof Array?ba(a,b,c):ca(a,b,c)}),ja=$('join'),ka=$('concat'),la=o(function(a,b){var c=Array.from(b);return c.sort(a),c}),ma=o(function(a,b){return ia(function(b){return!a.includes(b)},b)}),na=o(function(c,a){var b=ma(c,a),d=ma(a,c);return b.length>d.length?b:d}),oa=o(function(a,b,c){var d=Array.from(c),e=-1<a?a:d.length-Math.abs(a);return d[e]=b(d[e]),d}),pa=oa(0),qa=oa(-1),ra=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],sa=o(function(a,b){return g(W(b),ja(''))(a)}),ta=Object.freeze({wordSource:sa,word:function(a){return void 0===a&&(a=5),sa(ra,a)}}),w=Object.freeze({shuffle:function(a){for(var b=[].concat(a),c=b.length;0<c--;){var e=d(Math.random()*c+1),f=b[e],g=b[c];b[e]=g,b[c]=f}return b}}),s=o(function(c,d,b){return c(b,d)?b:d}),ua=function(c){return o(function(d,a){return c(a,d)})},va=_('fork');var wa=function(a,b,c){var d,e=a.length,f=Array(e),g=c===void 0?b:aa(b,c);for(d=0;d<e;d++)f[d]=g(a[d],d,a);return f};var xa=function(a,b,c){var d,e,f=Object.keys(a),g=f.length,h={},i=c===void 0?b:aa(b,c);for(d=0;d<g;d++)e=f[d],h[e]=i(a[e],e,a);return h};var ya=function(a,b,c){return a instanceof Array?wa(a,b,c):xa(a,b,c)},za=o(function(a,b){return b&&!Array.isArray(b)&&b.map?b.map(a):ya(b,a)});var Aa=function(e,f){return function(g,a,b,c){return e.call(f,g,a,b,c)}};var Ba=function(a,b,c,d){var e,f,g=a.length,h=d===void 0?b:Aa(b,d);for(void 0===c?(e=1,f=a[0]):(e=0,f=c);e<g;e++)f=h(f,a[e],e,a);return f};var Ca=function(a,b,c,d){var e,f,g,h=Object.keys(a),i=h.length,j=d===void 0?b:Aa(b,d);for(void 0===c?(e=1,g=a[h[0]]):(e=0,g=c);e<i;e++)f=h[e],g=j(g,a[f],f,a);return g};var Da=ha('reduce',function(a,b,c,d){return a instanceof Array?Ba(a,b,c,d):Ca(a,b,c,d)}),Ea=o(function(c,a){return c===a}),Fa=o(function(c,b){return b>c}),Ga=o(function(c,b){return b>=c}),Ha=o(function(c,b){return b<c}),Ia=o(function(c,b){return b<=c}),Ja=o(function(c,a){return a+c}),Ka=o(function(c,a){return a-c}),La=o(function(c,a){return a*c}),Ma=o(function(c,a){return a/c}),Na=o(function(c,a){return Math.pow(a,c)}),Oa=o(function(a,b,c){return Da(function(b,c){return b[c]||a},c,b)}),Pa=Oa(null),Qa=o(function(a,b,c){return Oa(a,[b],c)}),Ra=Qa(null),Sa=o(function(a,b,c){return g(Pa(b),a,Boolean)(c)}),Ta=o(function(a,b,c){return Sa(Ea(a),b,c)}),Ua=o(function(a,b,c){return g(Ra([b]),a,Boolean)(c)}),Va=o(function(a,b,c){return Sa(Ea(a),[b],c)}),Wa=Object.keys,Xa=Object.freeze,Ya=Object.assign,Za=Wa,$a=Ya,_a=o(function(c,a){return $a({},c,a)}),ab=function(a){return g(Za,za(function(b){return[b,a[b]]}))(a)},bb=ab,cb=Da(function(a,b){var c=b[0],d=b[1];return _a(a,(e={},e[c]=d,e));var e},{}),db=o(function(a,b){return g(bb,za(a),cb)(b)}),eb=o(function(a,b){return db(function(b){var c=b[0],d=b[1];return[a(c),d]},b)}),fb=Ra('length'),gb=g(Za,fb),hb=o(function(a,b){return a===typeof b}),ib=hb('boolean'),jb=hb('number'),kb=hb('function'),lb=hb('string'),mb=function(a){return null==a},nb=hb('object'),ob=Array.isArray,pb=o(function(a,b){return b&&b.ap&&kb(b.ap)?b.ap(a):kb(b)?function(c){return a(c)(b(c))}:Da(function(a,c){return a.concat(za(c,b))},[],a)}),qb=_('fold'),rb=c(function(a){var b=function(b){return b.reduce(function(a,b){return a.concat(b)})};a.exports=function(c,a){return a?b(c.map(a)):b(c)}}),sb=ga('chain',rb),tb=function(a){return!a},ub=o(function(b,c){return g(b(c),tb)}),vb=o(function(c,d,a){return g(c(d,a),tb)}),wb=o(function(d,e,a,b){return g(d(e,a,b),tb)}),xb=o(function(a,b){return ia(function(b){return!a(b)},b)}),yb=Z('trim'),zb=$('charAt'),Ab=$('codePointAt'),Bb=$('match'),Cb=$('repeat'),Db=$('search'),Eb=$('split'),Fb=_('endsWith'),Gb=o(function(a,b){return Fb(a,b.length,b)}),Hb=_('indexOf'),Ib=o(function(a,b){return Hb(a,0,b)}),Jb=_('lastIndexOf'),Kb=o(function(a,b){return Jb(a,Infinity,b)}),Lb=_('padEnd'),Mb=_('padStart'),Nb=_('replace'),Ob=_('startsWith'),Pb=o(function(a,b){return Ob(a,0,b)}),Qb=_('substr'),Rb=o(function(c,d,b){return c?b:d}),Sb=o(function(a,b,c,d){return a(d)?c(d):b(d)}),Tb=o(function(c,d){for(var e=[],f=c<d,g=f?[c,d]:[d+1,c+1],h=g[0],a=g[1],b=h;b<a;b++)e.push(b);return f?e:e.reverse()});var Ub=Object.keys,Vb=o(function(a,b,c){var d=ua(a);return Sb(Array.isArray,d(b),g(Ub,d(function(a){return b(c[a],a)})),c)}),Wb=Vb(function(a,b,c){var d,e=a.length,f=c===void 0?b:aa(b,c);for(d=0;d<e;d++)if(f(a[d],d,a))return!0;return!1}),Xb=Vb(function(a,b,c){var d,e=a.length,f=c===void 0?b:aa(b,c);for(d=0;d<e;d++)if(!f(a[d],d,a))return!1;return!0}),Yb=Object.assign(function(a){return void 0===a&&(a=1),e(Math.random()*a)},R,X,ta,w);a.pipe=g,a.compose=b,a.$=i,a.PLACEHOLDER=h,a.curryify=p,a.curry=o,a.curryObjectK=K,a.curryObjectN=M,a.curryObjectKN=N,a.remap=r,a.remapArray=q,a.K=k,a.I=l,a.version='3.4.1',a.random=Yb,a.concat=ka,a.join=ja,a.sort=la,a.symmetricDifference=na,a.difference=ma,a.alterIndex=oa,a.alterFirstIndex=pa,a.alterLastIndex=qa,a.choice=s,a.filter=ia,a.flip=ua,a.fork=va,a.iterate=f,a.map=za,a.length=function(a){return'object'==typeof a?gb(a):fb(a)},a.ap=pb,a.fold=qb,a.chain=sb,a.flatMap=sb,a.equals=Ea,a.equal=Ea,a.round=e,a.add=Ja,a.subtract=Ka,a.divide=Ma,a.multiply=La,a.pow=Na,a.invert=tb,a.not=function(a){return g(a,tb)},a.not1=ub,a.not2=vb,a.not3=wb,a.reduce=Da,a.reject=xb,a.charAt=zb,a.codePointAt=Ab,a.endsWith=Gb,a.indexOf=Ib,a.lastIndexOf=Kb,a.match=Bb,a.padEnd=Lb,a.padStart=Mb,a.repeat=Cb,a.replace=Nb,a.search=Db,a.split=Eb,a.startsWith=Pb,a.substr=Qb,a.trim=yb,a.ternary=Rb,a.triplet=Sb,a.range=Tb,a.keys=Za,a.assign=$a,a.freeze=Xa,a.merge=_a,a.entries=ab,a.fromPairs=cb,a.toPairs=bb,a.mapTuple=db,a.mapTuples=db,a.mapKeys=eb,a.path=Pa,a.pathOr=Oa,a.prop=Ra,a.propOr=Qa,a.pathEq=Ta,a.pathIs=Sa,a.propIs=Ua,a.propEq=Va,a.isTypeof=hb,a.isBoolean=ib,a.isNumber=jb,a.isFunction=kb,a.isString=lb,a.isObject=nb,a.isNil=mb,a.isArray=ob,a.isDistinctObject=function(a){return!mb(a)&&nb(a)&&!ob(a)},a.which=Vb,a.some=Wb,a.every=Xb,Object.defineProperty(a,'__esModule',{value:!0})});
