 // @ts-check
 require('dotenv').config();
 const { default: axios } = require('axios');
 const { lightOrange, lighterBlue, yellow, cyan, magenta, red, blue, green, teal, yellow2, brightBlue, orange, white } = require('./colors');
 // const mapih = require('mapih');
 // const { discord: { guilds } } = new (require('../Api'))();
 const lib = require('lib')({ token: process.env.token2 });
 const { __, merge } = require('ramda');
 
 
 
 function log(label, content, inline, options = {}) {
   const { color, line, file } = options;
   if (color) {
     let response;
     if (color === 'green') response = green(label);
     else if (color === 'orange') response = lightOrange(label);
     else if (color === 'red') response = red(label);
     else if (color === 'yellow') response = yellow(label);
     else response = red('Not a valid color option in LOG()');
     if (line) response = `${response} ${lightOrange(' [')}${white(file ? `line ${line} ` : `Line: ${line}`)}${lightOrange(']')}`;
     if (file) response = `${response} ${lightOrange(' [')}${white(line ? `of ${file}.js` : `File: ${file}`)}${lightOrange(']')}`;
     return console.log(response);
   }
   let newContent, stringContent;
   
   // const [count, properties] = analyzeObject(content);
   // const { string, boolean, number, object } = properties;
   
   const line1 = [
     lightOrange('>> '),
     lighterBlue(label),
     lightOrange(' <<'),
     lightOrange(' ['),
     white((typeof content).toString()),
     lightOrange(']')
   ];
   if (typeof content === 'string') {
     line1.push(
       lightOrange(' ['),
       white('Characters: '),
       lighterBlue(content.length),
       lightOrange(']')
     );
   }
   /*
   if (count) {
     line1.push(
       lightOrange(' ['),
       white('Properties: '),
       lighterBlue(count),
       lightOrange(']')
     );
   }
   */
   if (line) {
     line1.push(
       lightOrange(' ['),
       white(file ? `line ${line} ` : `Line: ${line}`),
       lightOrange(']')
     );
   }
   if (file) {
     line1.push(
       lightOrange(' ['),
       white(line ? `of ${file}.js` : `File: ${file}`),
       lightOrange(']')
     );
   }
 
   if (typeof content === 'undefined') newContent = 'undefined';
   
   // console.log('count', count);
   // console.log('props', properties);
   
   if (newContent !== 'undefined' && Array.isArray(content) && !content?.toString()?.includes('[object Object]')) {
     console.log(`${lightOrange(`Array`)}`);
     return console.log(content);
     // console.log('content:\n', content);
     // console.log('content.toString()\n', content.toString());
     /*
     const table = new AsciiTable3();
     table
       .setTitle(`${lightOrange('>> ')}${lighterBlue(`${label}`)}${lightOrange(' <<')}`)
       .setTitleAlignCenter()
       // .setHeading('', 'value')
       // .setHeadingAlignCenter()
       .addStyle(newRoundedStyle)
       .setStyle('lostmysocket');
     const titlelength = Math.round(label.length + 8);
     // const width = titlelength / 3;
     // table.setWidths([width, width, width]);
     let a = 0;
     if (content.length) {
       for (const stuff of content) {
         // console.log('stuff:', stuff);
         table
           .addRow(lightOrange(a), lighterBlue(stuff));
         a++;
       }
       table.setWidth(1, 3);
       table.setWidth(2, titlelength - 3);
     } else 
       table
         .addRow(lightOrange('empty'));
     return console.log(table?.toString());
     */
   } else if ((inline || newContent === 'undefined' || typeof content === 'boolean') && !content?.toString()?.includes('[object Object]')) {
     let response;
 
     if (line && file) 
       response = `${lightOrange(`${label}: `)}${lighterBlue(newContent === 'undefined' ? 'undefined' : content)}${white(' | ')}${lightOrange('Line ')}${lighterBlue(`${line}`)}${lightOrange(' of ')}${lighterBlue(`${file}:`)}`;
     else if (line || file) 
       response = `${lightOrange(`${label}: `)}${lighterBlue(newContent === 'undefined' ? 'undefined' : content)}${white(' | ')}${lightOrange(line ? 'Line: ' : 'File: ')}${lighterBlue(`${line ?? file}`)}`;
     else 
       response = `${lightOrange(`${label}: `)}${lighterBlue(newContent === 'undefined' ? 'undefined' : content)}`;
     
     return console.log(response);
   }
   if (content?.toString()?.includes('[object Object]')) {
     if (Array.isArray(content)) 
       line1.splice(4, 1, `${white('Array')} ${lighterBlue(' [')}${lightOrange(content.length)}${lighterBlue(']')}`);
     newContent = JSON.stringify(content, null, 2);
 
   } else if (typeof content === 'string') {
     newContent = `${lightOrange('"')}${lighterBlue(content)}${lightOrange('"')}`;
     
   } else newContent = lighterBlue(content);
   // ${teal(' [')}${white(content?.constructor?.name)}
   return console.log(`${[
     `${line1.join('')}`, newContent
   ].join('\n')}`);
 }
 
 
 
 // ================================================
 // type
 var type = _curry1(function type(val) {
   return val === null
     ? 'Null'
     : val === undefined
       ? 'Undefined'
       : Object.prototype.toString.call(val).slice(8, -1);
 });
 
 // ================================================
 // isNil
 var isNil = _curry1(function isNil(x) {return x == null;});
 
 // ================================================
 // nth
 var nth = _curry2(function nth(offset, list) {
   var idx = offset < 0 ? list.length + offset : offset;
   return _isString(list) ? list.charAt(idx) : list[idx];
 });
 
 // ================================================
 // __
 // { '@@functional/placeholder': true };
 // ================================================
 // curry
 var curry = _curry1(function curry(fn) {
   return curryN(fn.length, fn);
 });
 
 // ================================================
 // curryN
 var curryN = _curry2(function curryN(length, fn) {
   if (length === 1) {
     return _curry1(fn);
   }
   return _arity(length, _curryN(length, [], fn));
 });
 
 // ================================================
 // reduce
 var reduce = _curry3(function(xf, acc, list) {
   return _xReduce(typeof xf === 'function' ? _xwrap(xf) : xf, acc, list);
 });
 
 // ================================================
 // bind
 var bind = _curry2(function bind(fn, thisObj) {
   return _arity(fn.length, function() {
     return fn.apply(thisObj, arguments);
   });
 });
 
 // ================================================
 // slice
 var slice = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
   return Array.prototype.slice.call(list, fromIndex, toIndex);
 }));
 
 // ================================================
 // tail
 var tail = _curry1(_checkForMethod('tail', slice(1, Infinity)));
 
 // ================================================
 // pipe
 function pipe() {
   if (arguments.length === 0) {
     throw new Error('pipe requires at least one argument');
   }
   return _arity(
     arguments[0].length,
     reduce(_pipe, arguments[0], tail(arguments))
   );
 }
 
 // ================================================
 // reduceBy
 var reduceBy = _curryN(4, [], _dispatchable([], _xreduceBy,
   function reduceBy(valueFn, valueAcc, keyFn, list) {
     var xf = _xwrap(function(acc, elt) {
       var key = keyFn(elt);
       var value = valueFn(_has(key, acc) ? acc[key] : _clone(valueAcc, false), elt);
 
       if (value && value['@@transducer/reduced']) {
         return _reduced(acc);
       }
 
       acc[key] = value;
       return acc;
     });
     return _xReduce(xf, {}, list);
   }));
   
 // ================================================
 // groupBy
 var groupBy = _curry2(_checkForMethod('groupBy', reduceBy(function(acc, item) {
   acc.push(item);
   return acc;
 }, [])));
 
 // ================================================
 // hasPath
 var hasPath = _curry2(function hasPath(_path, obj) {
   if (_path.length === 0 || isNil(obj)) {
     return false;
   }
   var val = obj;
   var idx = 0;
   while (idx < _path.length) {
     if (!isNil(val) && _has(_path[idx], val)) {
       val = val[_path[idx]];
       idx += 1;
     } else {
       return false;
     }
   }
   return true;
 });
 
 // ================================================
 // has
 var has = _curry2(function has(prop, obj) {
   return hasPath([prop], obj);
 });
 
 // ================================================
 // useWith
 var useWith = _curry2(function useWith(fn, transformers) {
   return curryN(transformers.length, function() {
     var args = [];
     var idx = 0;
     while (idx < transformers.length) {
       args.push(transformers[idx].call(this, arguments[idx]));
       idx += 1;
     }
     return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
   });
 });
 
 // ================================================
 // last
 var last = nth(-1);
 
 // ================================================
 // toPairs
 var toPairs = _curry1(function toPairs(obj) {
   var pairs = [];
   for (var prop in obj) {
     if (_has(prop, obj)) {
       pairs[pairs.length] = [prop, obj[prop]];
     }
   }
   return pairs;
 });
 
 // ================================================
 // fromPairs
 var fromPairs = _curry1(function fromPairs(pairs) {
   var result = {};
   var idx = 0;
   while (idx < pairs.length) {
     // result[pairs[idx][0]] = pairs[idx][1];
     const [key, value] = pairs[idx];
     result[key] = value;
     idx += 1;
   }
   return result;
 });
 
 // ================================================
 // keys beginning
 var hasEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
 var nonEnumerableProps = [
   'constructor', 'valueOf', 'isPrototypeOf', 'toString',
   'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'
 ];
 // Safari bug
 var hasArgsEnumBug = (function() {
   'use strict';
   return arguments.propertyIsEnumerable('length');
 }());
 
 var contains = function contains(list, item) {
   var idx = 0;
   while (idx < list.length) {
     if (list[idx] === item) {
       return true;
     }
     idx += 1;
   }
   return false;
 };
 
 // keys fn
 var keys = typeof Object.keys === 'function' && !hasArgsEnumBug
   ? _curry1(function keys(obj) {
     return Object(obj) !== obj ? [] : Object.keys(obj);
   })
   : _curry1(function keys(obj) {
     if (Object(obj) !== obj) {
       return [];
     }
     var prop, nIdx;
     var ks = [];
     var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
     for (prop in obj) {
       if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
         ks[ks.length] = prop;
       }
     }
     if (hasEnumBug) {
       nIdx = nonEnumerableProps.length - 1;
       while (nIdx >= 0) {
         prop = nonEnumerableProps[nIdx];
         if (_has(prop, obj) && !contains(ks, prop)) {
           ks[ks.length] = prop;
         }
         nIdx -= 1;
       }
     }
     return ks;
   });
 
 // ================================================
 // reject
 var reject = _curry2(function reject(pred, filterable) {
   return filter(_complement(pred), filterable);
 });
 
 // ================================================
 // _xmap
 function XMap(f, xf) {
   this.xf = xf;
   this.f = f;
 }
 XMap.prototype['@@transducer/init'] = init;
 XMap.prototype['@@transducer/result'] = result;
 XMap.prototype['@@transducer/step'] = function(result, input) {
   return this.xf['@@transducer/step'](result, this.f(input));
 };
 
 var _xmap = function _xmap(f) {
   return function(xf) {return new XMap(f, xf);};
 };
 
 // ================================================
 // map
 var map = _curry2(_dispatchable(['fantasy-land/map', 'map'], _xmap, function map(fn, functor) {
   switch (Object.prototype.toString.call(functor)) {
   case '[object Function]':
     return curryN(functor.length, function() {
       return fn.call(this, functor.apply(this, arguments));
     });
   case '[object Object]':
     return _arrayReduce(function(acc, key) {
       acc[key] = fn(functor[key]);
       return acc;
     }, {}, keys(functor));
   default:
     return _map(fn, functor);
   }
 }));
 
 // ================================================
 // mergeWithKey
 var mergeWithKey = _curry3(function mergeWithKey(fn, l, r) {
   var result = {};
   var k;
   l = l || {};
   r = r || {};
 
   for (k in l) {
     if (_has(k, l)) {
       result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
     }
   }
 
   for (k in r) {
     if (_has(k, r) && !(_has(k, result))) {
       result[k] = r[k];
     }
   }
 
   return result;
 });
 
 // ================================================
 // mergeWith
 var mergeWith = _curry3(function mergeWith(fn, l, r) {
   return mergeWithKey(function(_, _l, _r) {
     return fn(_l, _r);
   }, l, r);
 });
 
 // ================================================
 // objOf
 var objOf = _curry2(function objOf(key, val) {
   var obj = {};
   obj[key] = val;
   return obj;
 });
 
 // ================================================
 // _toString
 function _toString(x, seen) {
   var recur = function recur(y) {
     var xs = seen.concat([x]);
     return _includes(y, xs) ? '<Circular>' : _toString(y, xs);
   };
 
   //  mapPairs :: (Object, [String]) -> [String]
   var mapPairs = function(obj, keys) {
     return _map(function(k) {return `${_quote(k)}: ${recur(obj[k])}`;}, keys.slice().sort());
   };
 
   switch (Object.prototype.toString.call(x)) {
   case '[object Arguments]':
     return `(function() { return arguments; }(${_map(recur, x).join(', ')}))`;
   case '[object Array]':
     return `[${_map(recur, x).concat(mapPairs(x, reject(function(k) {return /^\d+$/.test(k);}, keys(x)))).join(', ')}]`;
   case '[object Boolean]':
     return typeof x === 'object' ? `new Boolean(${recur(x.valueOf())})` : x.toString();
   case '[object Date]':
     return `new Date(${isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))})`;
   case '[object Map]':
     return `new Map(${recur(Array.from(x))})`;
   case '[object Null]':
     return 'null';
   case '[object Number]':
     return typeof x === 'object' ? `new Number(${recur(x.valueOf())})` : 1 / x === -Infinity ? '-0' : x.toString(10);
   case '[object Set]':
     return `new Set(${recur(Array.from(x).sort())})`;
   case '[object String]':
     return typeof x === 'object' ? `new String(${recur(x.valueOf())})` : _quote(x);
   case '[object Undefined]':
     return 'undefined';
   default:
     if (typeof x.toString === 'function') {
       var repr = x.toString();
       if (repr !== '[object Object]') {
         return repr;
       }
     }
     return `{${mapPairs(x, keys(x)).join(', ')}}`;
   }
 }
 // ================================================
 // toString
 var ToString = _curry1(function ToString(val) {return _toString(val, []);});
 
 // ================================================
 // max
 var max = _curry2(function max(a, b) {
   if (a === b) {return b;}
 
   function safeMax(x, y) {
     if ((x > y) !== (y > x)) {return y > x ? y : x;}
     return undefined;
   }
 
   var maxByValue = safeMax(a, b);
   if (maxByValue !== undefined) {return maxByValue;}
 
   var maxByType = safeMax(typeof a, typeof b);
   if (maxByType !== undefined) {return maxByType === typeof a ? a : b;}
 
   var stringA = ToString(a);
   var maxByStringValue = safeMax(stringA, ToString(b));
   if (maxByStringValue !== undefined) {return maxByStringValue === stringA ? a : b;}
 
   return b;
 });
 
 // ================================================
 // cond
 var cond = _curry1(function cond(pairs) {
   var arity = reduce(
     max,
     0,
     map(function(pair) {return pair[0].length;}, pairs)
   );
   return _arity(arity, function() {
     var idx = 0;
     while (idx < pairs.length) {
       if (pairs[idx][0].apply(this, arguments)) {
         return pairs[idx][1].apply(this, arguments);
       }
       idx += 1;
     }
   });
 });
 
 // ================================================
 // and
 var and = _curry2(function and(a, b) {
   return a && b;
 });
 
 // ================================================
 // reduce
 function _iterableReduce(reducer, acc, iter) {
   var step = iter.next();
   while (!step.done) {
     acc = reducer(acc, step.value);
     step = iter.next();
   }
   return acc;
 }
 
 function _methodReduce(reducer, acc, obj, methodName) {
   return obj[methodName](reducer, acc);
 }
 
 var _reduce = _createReduce(_arrayReduce, _methodReduce, _iterableReduce);
 
 // ================================================
 // ap
 var ap = _curry2(function ap(applyF, applyX) {
   return (
     typeof applyX['fantasy-land/ap'] === 'function'
       ? applyX['fantasy-land/ap'](applyF)
       : typeof applyF.ap === 'function'
         ? applyF.ap(applyX)
         : typeof applyF === 'function'
           ? function(x) {return applyF(x)(applyX(x));}
           : _reduce(function(acc, f) {return _concat(acc, map(f, applyX));}, [], applyF)
   );
 });
   
 // ================================================
 // equals
 var equals = _curry2(function equals(a, b) {
   return _equals(a, b, [], []);
 });
 
 // ================================================
 // liftN
 var liftN = _curry2(function liftN(arity, fn) {
   var lifted = curryN(arity, fn);
   return curryN(arity, function() {
     return _arrayReduce(ap, map(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
   });
 });
 
 // ================================================
 // lift
 var lift = _curry1(function lift(fn) {
   return liftN(fn.length, fn);
 });
 
 // ================================================
 // both
 var both = _curry2(function both(f, g) {
   return _isFunction(f)
     ? function _both() {
       return f.apply(this, arguments) && g.apply(this, arguments);
     }
     : lift(and)(f, g);
 });
 
 // ================================================
 // _concat
 function _concat(set1, set2) {
   set1 = set1 || [];
   set2 = set2 || [];
   var idx;
   var len1 = set1.length;
   var len2 = set2.length;
   var result = [];
 
   idx = 0;
   while (idx < len1) {
     result[result.length] = set1[idx];
     idx += 1;
   }
   idx = 0;
   while (idx < len2) {
     result[result.length] = set2[idx];
     idx += 1;
   }
   return result;
 }
 
 // ================================================
 // ifElse
 var ifElse = _curry3(function ifElse(condition, onTrue, onFalse) {
   return curryN(Math.max(condition.length, onTrue.length, onFalse.length),
     function _ifElse() {
       return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
     }
   );
 });
 
 // ================================================
 // always
 var always = _curry1(function always(val) {
   return function() {
     return val;
   };
 });
 
 // ================================================
 // apply
 var apply = _curry2(function apply(fn, args) {
   return fn.apply(this, args);
 });
 
 // ================================================
 // prop
 var prop = _curry2(function prop(p, obj) {
   if (obj == null) {
     return;
   }
   return _isInteger(p) ? nth(p, obj) : obj[p];
 });
 
 // ================================================
 // values
 var values = _curry1(function values(obj) {
   var props = keys(obj);
   var len = props.length;
   var vals = [];
   var idx = 0;
   while (idx < len) {
     vals[idx] = obj[props[idx]];
     idx += 1;
   }
   return vals;
 });
 
 // ================================================
 // _filter
 function _filter(fn, list) {
   var idx = 0;
   var len = list.length;
   var result = [];
 
   while (idx < len) {
     if (fn(list[idx])) {
       result[result.length] = list[idx];
     }
     idx += 1;
   }
   return result;
 }
 
 // ================================================
 // filter
 var filter = _curry2(_dispatchable(['fantasy-land/filter', 'filter'], _xfilter, function(pred, filterable) {
   return (
     _isObject(filterable)
       ? _arrayReduce(function(acc, key) {
         if (pred(filterable[key])) {
           acc[key] = filterable[key];
         }
         return acc;
       }, {}, keys(filterable))
     // else
       : _filter(pred, filterable)
   );
 }));
 
 // ================================================
 // _xfilter
 function XFilter(f, xf) {
   this.xf = xf;
   this.f = f;
 }
 XFilter.prototype['@@transducer/init'] = init;
 XFilter.prototype['@@transducer/result'] = result;
 XFilter.prototype['@@transducer/step'] = function(result, input) {
   return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
 };
 
 function _xfilter(f) {
   return function(xf) {return new XFilter(f, xf);};
 }
 // ================================================
 // _toISOString
 var pad = function pad(n) {return (n < 10 ? '0' : '') + n;};
 
 var _toISOString = typeof Date.prototype.toISOString === 'function'
   ? function _toISOString(d) {
     return d.toISOString();
   }
   : function _toISOString(d) {
     return (
       `${d.getUTCFullYear()}-${ 
         pad(d.getUTCMonth() + 1)}-${ 
         pad(d.getUTCDate())}T${ 
         pad(d.getUTCHours())}:${ 
         pad(d.getUTCMinutes())}:${ 
         pad(d.getUTCSeconds())}.${ 
         (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5)}Z`
     );
   };
 
 // ================================================
 // evolve
 /*
  * @example
  *
  * const tomato = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
  * const transformations = {
  *   firstName: R.trim,
  *   lastName: R.trim, // Will not get invoked.
  *   data: {elapsed: R.add(1), remaining: R.add(-1)}
  * };
  * R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
  */
 var evolve = _curry2(function evolve(transformations, object) {
   if (!_isObject(object) && !_isArray(object)) {
     return object;
   }
   var result = object instanceof Array ? [] : {};
   var transformation, key, type;
   for (key in object) {
     transformation = transformations[key];
     type = typeof transformation;
     result[key] = type === 'function'
       ? transformation(object[key])
       : transformation && type === 'object'
         ? evolve(transformation, object[key])
         : object[key];
   }
   return result;
 });
 
 // ================================================
 // complement
 function _complement(f) {
   return function() {
     return !f.apply(this, arguments);
   };
 }
 
 // ================================================
 // _includes
 function _includes(a, list) {
   return _indexOf(list, a, 0) >= 0;
 }
 
 // ================================================
 // _indexOf
 function _indexOf(list, a, idx) {
   var inf, item;
   // Array.prototype.indexOf doesn't exist below IE9
   if (typeof list.indexOf === 'function') {
     switch (typeof a) {
     case 'number':
       if (a === 0) {
         // manually crawl the list to distinguish between +0 and -0
         inf = 1 / a;
         while (idx < list.length) {
           item = list[idx];
           if (item === 0 && 1 / item === inf) {
             return idx;
           }
           idx += 1;
         }
         return -1;
       } else if (a !== a) {
         // NaN
         while (idx < list.length) {
           item = list[idx];
           if (typeof item === 'number' && item !== item) {
             return idx;
           }
           idx += 1;
         }
         return -1;
       }
       // non-zero numbers can utilise Set
       return list.indexOf(a, idx);
 
       // all these types can utilise Set
     case 'string':
     case 'boolean':
     case 'function':
     case 'undefined':
       return list.indexOf(a, idx);
 
     case 'object':
       if (a === null) {
         // null can utilise Set
         return list.indexOf(a, idx);
       }
     }
   }
   // anything else not covered above, defer to R.equals
   while (idx < list.length) {
     if (equals(list[idx], a)) {
       return idx;
     }
     idx += 1;
   }
   return -1;
 }
 
 // ================================================
 // _quote
 function _quote(s) {
   var escaped = s
     .replace(/\\/g, '\\\\')
     .replace(/[\b]/g, '\\b') // \b matches word boundary; [\b] matches backspace
     .replace(/\f/g, '\\f')
     .replace(/\n/g, '\\n')
     .replace(/\r/g, '\\r')
     .replace(/\t/g, '\\t')
     .replace(/\v/g, '\\v')
     .replace(/\0/g, '\\0');
 
   return `"${escaped.replace(/"/g, '\\"')}"`;
 }
 
 // ================================================
 // _isPlaceholder
 function _isPlaceholder(a) {
   return a != null
      && typeof a === 'object'
      && a['@@functional/placeholder'] === true;
 }
 
 // ================================================
 
 // _aririty
 function _arity(n, fn) {
   switch (n) {
   case 0: return function() {return fn.apply(this, arguments);};
   case 1: return function(a0) {return fn.apply(this, arguments);};
   case 2: return function(a0, a1) {return fn.apply(this, arguments);};
   case 3: return function(a0, a1, a2) {return fn.apply(this, arguments);};
   case 4: return function(a0, a1, a2, a3) {return fn.apply(this, arguments);};
   case 5: return function(a0, a1, a2, a3, a4) {return fn.apply(this, arguments);};
   case 6: return function(a0, a1, a2, a3, a4, a5) {return fn.apply(this, arguments);};
   case 7: return function(a0, a1, a2, a3, a4, a5, a6) {return fn.apply(this, arguments);};
   case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) {return fn.apply(this, arguments);};
   case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {return fn.apply(this, arguments);};
   case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {return fn.apply(this, arguments);};
   default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
   }
 }
 
 // ================================================
 
 // _curry1
 function _curry1(fn) {
   return function f1(a) {
     if (arguments.length === 0 || _isPlaceholder(a)) {
       return f1;
     } else {
       return fn.apply(this, arguments);
     }
   };
 }
 
 // ================================================
 
 // _curry2
 function _curry2(fn) {
   return function f2(a, b) {
     switch (arguments.length) {
     case 0:
       return f2;
     case 1:
       return _isPlaceholder(a)
         ? f2
         : _curry1(function(_b) {return fn(a, _b);});
     default:
       return _isPlaceholder(a) && _isPlaceholder(b)
         ? f2
         : _isPlaceholder(a)
           ? _curry1(function(_a) {return fn(_a, b);})
           : _isPlaceholder(b)
             ? _curry1(function(_b) {return fn(a, _b);})
             : fn(a, b);
     }
   };
 }
 
 // ================================================
 
 // _curry3
 function _curry3(fn) {
   return function f3(a, b, c) {
     switch (arguments.length) {
     case 0:
       return f3;
     case 1:
       return _isPlaceholder(a)
         ? f3
         : _curry2(function(_b, _c) {return fn(a, _b, _c);});
     case 2:
       return _isPlaceholder(a) && _isPlaceholder(b)
         ? f3
         : _isPlaceholder(a)
           ? _curry2(function(_a, _c) {return fn(_a, b, _c);})
           : _isPlaceholder(b)
             ? _curry2(function(_b, _c) {return fn(a, _b, _c);})
             : _curry1(function(_c) {return fn(a, b, _c);});
     default:
       return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c)
         ? f3
         : _isPlaceholder(a) && _isPlaceholder(b)
           ? _curry2(function(_a, _b) {return fn(_a, _b, c);})
           : _isPlaceholder(a) && _isPlaceholder(c)
             ? _curry2(function(_a, _c) {return fn(_a, b, _c);})
             : _isPlaceholder(b) && _isPlaceholder(c)
               ? _curry2(function(_b, _c) {return fn(a, _b, _c);})
               : _isPlaceholder(a)
                 ? _curry1(function(_a) {return fn(_a, b, c);})
                 : _isPlaceholder(b)
                   ? _curry1(function(_b) {return fn(a, _b, c);})
                   : _isPlaceholder(c)
                     ? _curry1(function(_c) {return fn(a, b, _c);})
                     : fn(a, b, c);
     }
   };
 }
 
 // ================================================
 
 // _curryN
 function _curryN(length, received, fn) {
   return function() {
     var combined = [];
     var argsIdx = 0;
     var left = length;
     var combinedIdx = 0;
     var hasPlaceholder = false;
     while (combinedIdx < received.length || argsIdx < arguments.length) {
       var result;
       if (combinedIdx < received.length
           && (!_isPlaceholder(received[combinedIdx])
            || argsIdx >= arguments.length)) {
         result = received[combinedIdx];
       } else {
         result = arguments[argsIdx];
         argsIdx += 1;
       }
       combined[combinedIdx] = result;
       if (!_isPlaceholder(result)) {
         left -= 1;
       } else {
         hasPlaceholder = true;
       }
       combinedIdx += 1;
     }
 
     return (!hasPlaceholder && left <= 0)
       ? fn.apply(this, combined)
       : _arity(Math.max(0, left), _curryN(length, combined, fn));
   };
 }
 
 // ================================================
 
 // _pipe
 function _pipe(f, g) {
   return function() {
     return g.call(this, f.apply(this, arguments));
   };
 }
 
 // ================================================
 // _xwrap
 function XWrap(fn) {
   this.f = fn;
 }
 XWrap.prototype['@@transducer/init'] = function() {
   throw new Error('init not implemented on XWrap');
 };
 XWrap.prototype['@@transducer/result'] = function(acc) {return acc;};
 XWrap.prototype['@@transducer/step'] = function(acc, x) {
   return this.f(acc, x);
 };
 
 function _xwrap(fn) {return new XWrap(fn);}
 
 // ================================================
 // _isArguments
 var { toString: ts } = Object.prototype;
 var _isArguments = (function() {
   return ts.call(arguments) === '[object Arguments]'
     ? function _isArguments(x) {return ts.call(x) === '[object Arguments]';}
     : function _isArguments(x) {return _has('callee', x);};
 }());
   
 // ================================================
 // _isInteger
 function _isInteger(n) {
   return (n << 0) === n;
 }
 
 // ================================================
 
 // _isString
 function _isString(x) {
   return Object.prototype.toString.call(x) === '[object String]';
 }
 
 // ================================================
 // _isArray
 function _isArray(val) {
   return (val != null
     && val.length >= 0
     && Object.prototype.toString.call(val) === '[object Array]');
 }
 
 // ================================================
 // _isArrayLike
 var _isArrayLike = _curry1(function isArrayLike(x) {
   if (_isArray(x)) {return true;}
   if (!x) {return false;}
   if (typeof x !== 'object') {return false;}
   if (_isString(x)) {return false;}
   if (x.length === 0) {return true;}
   if (x.length > 0) {
     return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
   }
   return false;
 });
 
 // ================================================
 // _isObject
 function _isObject(x) {
   return Object.prototype.toString.call(x) === '[object Object]';
 }
 
 // ================================================
 // _createReduce
 var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
 
 function _createReduce(arrayReduce, methodReduce, iterableReduce) {
   return function _reduce(xf, acc, list) {
     if (_isArrayLike(list)) {
       return arrayReduce(xf, acc, list);
     }
     if (list == null) {
       return acc;
     }
     if (typeof list['fantasy-land/reduce'] === 'function') {
       return methodReduce(xf, acc, list, 'fantasy-land/reduce');
     }
     if (list[symIterator] != null) {
       return iterableReduce(xf, acc, list[symIterator]());
     }
     if (typeof list.next === 'function') {
       return iterableReduce(xf, acc, list);
     }
     if (typeof list.reduce === 'function') {
       return methodReduce(xf, acc, list, 'reduce');
     }
 
     throw new TypeError('reduce: list must be array or iterable');
   };
 }
 
 // ================================================
 // _reduced
 function _reduced(x) {
   return x && x['@@transducer/reduced'] ? x
     : {
       '@@transducer/value': x,
       '@@transducer/reduced': true
     };
 }
 
 // ================================================
 
 // ================================================
 // _xArrayReduce
 function _xArrayReduce(xf, acc, list) {
   var idx = 0;
   var len = list.length;
   while (idx < len) {
     acc = xf['@@transducer/step'](acc, list[idx]);
     if (acc && acc['@@transducer/reduced']) {
       acc = acc['@@transducer/value'];
       break;
     }
     idx += 1;
   }
   return xf['@@transducer/result'](acc);
 }
 
 // ================================================
 // _checkForMethod
 function _checkForMethod(methodname, fn) {
   return function() {
     var { length } = arguments;
     if (length === 0) {
       return fn();
     }
     var obj = arguments[length - 1];
     return (_isArray(obj) || typeof obj[methodname] !== 'function')
       ? fn.apply(this, arguments)
       : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
   };
 }
 
 // ================================================
 // _cloneRegExp
 function _cloneRegExp(pattern) {
   return new RegExp(pattern.source, (
     pattern.flags
       ? pattern.flags
       : (pattern.global ? 'g' : '')
         + (pattern.ignoreCase ? 'i' : '')
         + (pattern.multiline ? 'm' : '')
         + (pattern.sticky ? 'y' : '')
         + (pattern.unicode ? 'u' : '')
         + (pattern.dotAll ? 's' : '')
   ));
 }
 
 // ================================================
 // _has
 function _has(prop, obj) {
   return Object.prototype.hasOwnProperty.call(obj, prop);
 }
 
 // ================================================
 // _isTransformer
 function _isTransformer(obj) {
   return obj != null && typeof obj['@@transducer/step'] === 'function';
 }
 
 // ================================================
 // _dispatchable
 function _dispatchable(methodNames, transducerCreator, fn) {
   return function() {
     if (arguments.length === 0) {
       return fn();
     }
     var obj = arguments[arguments.length - 1];
     if (!_isArray(obj)) {
       var idx = 0;
       while (idx < methodNames.length) {
         if (typeof obj[methodNames[idx]] === 'function') {
           return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
         }
         idx += 1;
       }
       if (_isTransformer(obj)) {
         var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
         return transducer(obj);
       }
     }
     return fn.apply(this, arguments);
   };
 }
 
 // ================================================
 // _clone
 function _clone(value, deep, map) {
 
   map || (map = new _ObjectMap());
 
   // this avoids the slower switch with a quick if decision removing some milliseconds in each run.
   if (_isPrimitive(value)) {
     return value;
   }
 
   var copy = function copy(copiedValue) {
     // Check for circular and same references on the object graph and return its corresponding clone.
     var cachedCopy = map.get(value);
 
     if (cachedCopy) {
       return cachedCopy;
     }
 
     map.set(value, copiedValue);
 
     for (var key in value) {
       if (Object.prototype.hasOwnProperty.call(value, key)) {
         copiedValue[key] = deep ? _clone(value[key], true, map) : value[key];
       }
     }
     return copiedValue;
   };
 
   switch (type(value)) {
   case 'Object': return copy(Object.create(Object.getPrototypeOf(value)));
   case 'Array': return copy([]);
   case 'Date': return new Date(value.valueOf());
   case 'RegExp': return _cloneRegExp(value);
   case 'Int8Array':
   case 'Uint8Array':
   case 'Uint8ClampedArray':
   case 'Int16Array':
   case 'Uint16Array':
   case 'Int32Array':
   case 'Uint32Array':
   case 'Float32Array':
   case 'Float64Array':
   case 'BigInt64Array':
   case 'BigUint64Array':
     return value.slice();
   default: return value;
   }
 }
 
 function _isPrimitive(param) {
   var type = typeof param;
   return param == null || (type != 'object' && type != 'function');
 }
 
 function _ObjectMap() {
   this.map = {};
   this.length = 0;
 }
 
 _ObjectMap.prototype.set = function(key, value) {
   const hashedKey = this.hash(key);
 
   let bucket = this.map[hashedKey];
   if (!bucket) {
     this.map[hashedKey] = bucket = [];
   }
 
   bucket.push([key, value]);
   this.length += 1;
 };
 
 _ObjectMap.prototype.hash = function(key) {
   const hashedKey = [];
   for (var value in key) {
     hashedKey.push(Object.prototype.toString.call(key[value]));
   }
   return hashedKey.join();
 };
 
 _ObjectMap.prototype.get = function(key) {
 
   /**
    * depending on the number of objects to be cloned is faster to just iterate over the items in the map just because the hash function is so costly,
    * on my tests this number is 180, anything above that using the hash function is faster.
    */
   if (this.length <= 180) {
 
     for (const p in this.map) {
       const bucket = this.map[p];
 
       for (let i = 0; i < bucket.length; i += 1) {
         const element = bucket[i];
         if (element[0] === key) {return element[1];}
       }
 
     }
     return;
   }
 
   const hashedKey = this.hash(key);
   const bucket = this.map[hashedKey];
 
   if (!bucket) {return;}
 
   for (let i = 0; i < bucket.length; i += 1) {
     const element = bucket[i];
     if (element[0] === key) {return element[1];}
   }
 
 };
 
 // ================================================
 // _xReduce
 function _xIterableReduce(xf, acc, iter) {
   var step = iter.next();
   while (!step.done) {
     acc = xf['@@transducer/step'](acc, step.value);
     if (acc && acc['@@transducer/reduced']) {
       acc = acc['@@transducer/value'];
       break;
     }
     step = iter.next();
   }
   return xf['@@transducer/result'](acc);
 }
 
 function _xMethodReduce(xf, acc, obj, methodName) {
   return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
 }
 
 var _xReduce = _createReduce(_xArrayReduce, _xMethodReduce, _xIterableReduce);
 
 // ================================================
 // _xfBase
 function init() {
   return this.xf['@@transducer/init']();
 }
 
 function result(result) {
   return this.xf['@@transducer/result'](result);
 }
 
 // ================================================
 // _xreduceBy
 function XReduceBy(valueFn, valueAcc, keyFn, xf) {
   this.valueFn = valueFn;
   this.valueAcc = valueAcc;
   this.keyFn = keyFn;
   this.xf = xf;
   this.inputs = {};
 }
 XReduceBy.prototype['@@transducer/init'] = init;
 XReduceBy.prototype['@@transducer/result'] = function(result) {
   var key;
   for (key in this.inputs) {
     if (_has(key, this.inputs)) {
       result = this.xf['@@transducer/step'](result, this.inputs[key]);
       if (result['@@transducer/reduced']) {
         result = result['@@transducer/value'];
         break;
       }
     }
   }
   // @ts-ignore
   this.inputs = null;
   return this.xf['@@transducer/result'](result);
 };
 XReduceBy.prototype['@@transducer/step'] = function(result, input) {
   var key = this.keyFn(input);
   this.inputs[key] = this.inputs[key] || [key, _clone(this.valueAcc, false)];
   this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
   return result;
 };
 
 function _xreduceBy(valueFn, valueAcc, keyFn) {
   return function(xf) {
     return new XReduceBy(valueFn, valueAcc, keyFn, xf);
   };
 }
 
 // ================================================
 // _arrayReduce
 function _arrayReduce(reducer, acc, list) {
   var index = 0;
   var { length } = list;
   while (index < length) {
     acc = reducer(acc, list[index]);
     index += 1;
   }
   return acc;
 }
 
 // ================================================
 // _map
 function _map(fn, functor) {
   var idx = 0;
   var len = functor.length;
   var result = Array(len);
   while (idx < len) {
     result[idx] = fn(functor[idx]);
     idx += 1;
   }
   return result;
 }
 
 
 // ================================================
 // _isFunction
 function _isFunction(x) {
   var type = Object.prototype.toString.call(x);
   return type === '[object Function]'
     || type === '[object AsyncFunction]'
     || type === '[object GeneratorFunction]'
     || type === '[object AsyncGeneratorFunction]';
 }
   
 // ================================================
 // _arrayFromIterator
 function _arrayFromIterator(iter) {
   var list = [];
   var next;
   while (!(next = iter.next()).done) {
     list.push(next.value);
   }
   return list;
 }
 
 // ================================================
 // _includesWith
 function _includesWith(pred, x, list) {
   var idx = 0;
   var len = list.length;
 
   while (idx < len) {
     if (pred(x, list[idx])) {
       return true;
     }
     idx += 1;
   }
   return false;
 }
 
 // ================================================
 // _functionName
 function _functionName(f) {
   // String(x => x) evaluates to "x => x", so the pattern may not match.
   var match = String(f).match(/^function (\w*)/);
   return match == null ? '' : match[1];
 }
 
 // ================================================
 // _equals
 function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
   var a = _arrayFromIterator(aIterator);
   var b = _arrayFromIterator(bIterator);
 
   function eq(_a, _b) {
     return _equals(_a, _b, stackA.slice(), stackB.slice());
   }
 
   // if *a* array contains any element that is not included in *b*
   return !_includesWith(function(b, aItem) {
     return !_includesWith(eq, aItem, b);
   }, b, a);
 }
 
 function _equals(a, b, stackA, stackB) {
   if (_objectIs(a, b)) {
     return true;
   }
 
   var typeA = type(a);
 
   if (typeA !== type(b)) {
     return false;
   }
 
   if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
     return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b)
       && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
   }
 
   if (typeof a.equals === 'function' || typeof b.equals === 'function') {
     return typeof a.equals === 'function' && a.equals(b)
       && typeof b.equals === 'function' && b.equals(a);
   }
 
   switch (typeA) {
   case 'Arguments':
   case 'Array':
   case 'Object':
     if (typeof a.constructor === 'function'
         && _functionName(a.constructor) === 'Promise') {
       return a === b;
     }
     break;
   case 'Boolean':
   case 'Number':
   case 'String':
     if (!(typeof a === typeof b && _objectIs(a.valueOf(), b.valueOf()))) {
       return false;
     }
     break;
   case 'Date':
     if (!_objectIs(a.valueOf(), b.valueOf())) {
       return false;
     }
     break;
   case 'Error':
     return a.name === b.name && a.message === b.message;
   case 'RegExp':
     if (!(a.source === b.source
           && a.global === b.global
           && a.ignoreCase === b.ignoreCase
           && a.multiline === b.multiline
           && a.sticky === b.sticky
           && a.unicode === b.unicode)) {
       return false;
     }
     break;
   }
 
   var idx = stackA.length - 1;
   while (idx >= 0) {
     if (stackA[idx] === a) {
       return stackB[idx] === b;
     }
     idx -= 1;
   }
 
   switch (typeA) {
   case 'Map':
     if (a.size !== b.size) {
       return false;
     }
 
     return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
   case 'Set':
     if (a.size !== b.size) {
       return false;
     }
 
     return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
   case 'Arguments':
   case 'Array':
   case 'Object':
   case 'Boolean':
   case 'Number':
   case 'String':
   case 'Date':
   case 'Error':
   case 'RegExp':
   case 'Int8Array':
   case 'Uint8Array':
   case 'Uint8ClampedArray':
   case 'Int16Array':
   case 'Uint16Array':
   case 'Int32Array':
   case 'Uint32Array':
   case 'Float32Array':
   case 'Float64Array':
   case 'ArrayBuffer':
     break;
   default:
     // Values of other types are only equal if identical.
     return false;
   }
 
   var keysA = keys(a);
   if (keysA.length !== keys(b).length) {
     return false;
   }
 
   var extendedStackA = stackA.concat([a]);
   var extendedStackB = stackB.concat([b]);
 
   idx = keysA.length - 1;
   while (idx >= 0) {
     var key = keysA[idx];
     if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
       return false;
     }
     idx -= 1;
   }
   return true;
 }
 // ================================================
 // _objectIs
 function _objectIs(a, b) {
   // SameValue algorithm
   if (a === b) { // Steps 1-5, 7-10
     // Steps 6.b-6.e: +0 != -0
     return a !== 0 || 1 / a === 1 / b;
   } else {
     // Step 6.a: NaN == NaN
     return a !== a && b !== b;
   }
 }
 // export default typeof Object.is === 'function' ? Object.is : _objectIs;
 
 function stringify(content) {
   return JSON.stringify(content)
 }
 
 /**
  * @param {Object} obj1 
  * @param {Object} obj2 
  * @param {Array<string>} [included]
  * @returns {{added: Record<string, any>, removed: Record<string, any>, changed: Record<string, any>, common: Record<string, any>}}
  */
 function objectDifference(obj1, obj2, included) {
   /*
   if (Array.isArray(obj1) && Array.isArray(obj2)) {
     return arrDiff(obj1, obj2);
   }
   */
   if (!obj1 || !obj2 || !Object.entries(obj1).length || !Object.entries(obj2).length || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
     let errobj = {};
     if (!obj1 || !Object.entries(obj1)?.length || typeof obj1 !== 'object') errobj['obj1'] = !obj1 || !Object.entries(obj1)?.length ? 'undefined' : obj1;
     if (!obj2 || !Object.entries(obj2)?.length || typeof obj2 !== 'object') errobj['obj2'] = !obj2 || !Object.entries(obj2)?.length ? 'undefined' : obj2;
     // console.log(`Invalid input objects:\nobj1: ${JSON.stringify(obj1, null, 2)}\nobj2: ${JSON.stringify(obj2, null, 2)}`);
     return { error: 'Invalid input objects', errobj };
   }
   var groupObjBy = curry(
     pipe(useWith(groupBy, [useWith(__, [last]), toPairs]), map(fromPairs))
   );
 
   var diffObjs = pipe(
     useWith(mergeWith(merge), [
       map(objOf('old')),
       map(objOf('new'))
     ]),
     groupObjBy(
       cond([
         [
           both(has('old'), has('new')),
           pipe(values, ifElse(
             apply(equals),
             always('common'),
             always('changed')
           ))
         ],
         [has('old'), always('removed')],
         [has('new'), always('added')]
       ])
     ),
     evolve({
       common: map(prop('old')),
       onlyOnLeft: map(prop('old')),
       onlyOnRight: map(prop('new'))
     })
   );
   // console.log('diffObjs in objectDifference()', diffObjs(obj1, obj2));
   let newObj = {},
     removed = {},
     added = {},
     changed = {},
     common = {};
     
   for (const [key, value] of Object.entries(diffObjs(obj1, obj2))) {
     if (key === 'removed')
       for (const [k, v] of Object.entries(value)) {
         // console.log('k in removed:', k);
         // console.log('v in removed:', v);
         if ((included?.length && included?.includes(k)) || !included?.length)
           [removed[k]] = Object.values(v);
       }
     if (key === 'added') {
       for (const [k, v] of Object.entries(value)) {
         // console.log('k in added:', k);
         // console.log('v in added:', v);
 
         if ((included?.length && included?.includes(k)) || !included?.length) {
           // console.log('Object.values(v)', Object.values(v));
           [added[k]] = Object.values(v);
           // console.log('added', added);
         }
       }
     }
     
     if (key === 'changed')
       for (const [k, v] of Object.entries(value)) {
         // console.log('k in changed:', k);
         // console.log('v in changed:', v);
         if ((included?.length && included?.includes(k)) || !included?.length) {
           // console.log('Object.values(v)', Object.values(v));
           [changed[k]] = Object.values(v);
           // console.log('changed1', changed);
         }
       }
     
     if (key === 'common') 
       for (const [k, v] of Object.entries(value)) {
         // console.log('k in common:', k);
         // console.log('v in common:', v);
 
         if ((included?.length && included?.includes(k)) || !included?.length) {
           // console.log('Object.values(v)', Object.values(v));
           [common[k]] = Object.values(v);
           // console.log('common1', common);
         }
       }
     
     if (Object.keys(added).length) 
       newObj['added'] = added;
     
     if (Object.keys(removed).length) 
       newObj['removed'] = removed;
 
     if (Object.keys(changed).length) 
       newObj['changed'] = changed;
     
     if (Object.keys(common).length) 
       newObj['common'] = common;
     
   }
   return newObj;
 }
 
 function arrDiff(arr1, arr2, property) {
  if (property) log('property', property);
  const result = {};
  const added = arr2.filter((obj2) => {
    return !arr1.some((obj1) => {
      if (property) {
        const obj1Prop = get(obj1, property);
        // log('obj1Prop', obj1Prop);
        const obj2Prop = get(obj2, property);
        // log('obj2Prop', obj2Prop);
        return obj1Prop === obj2Prop;
        // return getObjVal(property, obj1) === getObjVal(property, obj2)
      } else {
        return stringify(obj1) === stringify(obj2);
      }
    });
  });
  const removed = arr1.filter((obj1) => {
    return !arr2.some((obj2) => {
      if (property) {
        const obj1Prop = get(property, obj1);
        // log('obj1Prop', obj1Prop);
        const obj2Prop = get(property, obj2);
        // log('obj2Prop', obj2Prop);
        return obj1Prop === obj2Prop;
        // return getObjVal(property, obj1) === getObjVal(property, obj2)
      } else {
        return stringify(obj1) === stringify(obj2);
      }
    });
  });
  // const removed = arr1.filter(obj1 => !arr2.some(obj2 => obj1.user.id === obj2.user.id));
  if (added.length) result.added = added;
  if (removed.length) result.removed = removed;
  return result;
}

function get(obj, path, defaultValue = undefined) {
  const travel = (regexp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (
        res !== null && res !== undefined
          ? res[key]
          : res
      ), obj);
  const result
    = travel(/[,[\]]+?/)
    || travel(/[,[\].]+?/);

  return result === undefined || result === obj
    ? defaultValue
    : result;
}

 module.exports = {
  get,
  arrDiff,
   log,
   // start,
   // end,
   // imageToBuffer,
   // codeblock,
   // sleep,
   objectDifference,
   stringify,
   curry,
   pipe,
   useWith,
   groupBy,
   __, //: { '@@functional/placeholder': true },
   toPairs,
   fromPairs,
   map,
   mergeWith,
   merge, /*: mergeWith(function(l, r) {
     return r;
   }),*/
   objOf,
   cond,
   both,
   has,
   values,
   ifElse,
   apply,
   equals,
   always,
   evolve,
   prop,
   last
 }