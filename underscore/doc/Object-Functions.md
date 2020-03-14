# Object Functions

## keys
`_.keys(object)` 检索 `object` 拥有的所有可枚举属性的名称。

```js
_.keys({one: 1, two: 2, three: 3});
=> ["one", "two", "three"]
```

## allKeys
`_.allKeys(object)` 检索 `object` 拥有的和继承的所有属性的名称。

```js
function Stooge(name) {
  this.name = name;
}
Stooge.prototype.silly = true;
_.allKeys(new Stooge("Moe"));
=> ["name", "silly"]
```

## values
`_.values(object)` 返回 `object` 对象所有的属性值。

```js
_.values({one: 1, two: 2, three: 3});
=> [1, 2, 3]
```

## mapObject
`_.mapObject(object, iteratee, [context])` 它类似于 `map`，但是这用于对象。转换每个属性的值。

```js
_.mapObject({start: 5, end: 12}, function(val, key) {
  return val + 5;
});
=> {start: 10, end: 17}
```

## pairs
`_.pairs(object)` 把一个对象转变为一个 `[key, value]` 形式的数组。

```js
_.pairs({one: 1, two: 2, three: 3});
=> [["one", 1], ["two", 2], ["three", 3]]
```

## invert
`_.invert(object)` 返回一个 `object` 副本，使其键（keys）和值（values）对换。<br/>
对于这个操作，必须确保object里所有的值都是唯一的且可以序列号成字符串.

```js
_.invert({ Moe: "Moses", Larry: "Louis", Curly: "Jerome" });
=> { Moses: "Moe", Louis: "Larry", Jerome: "Curly"};
```

## create
`_.create(prototype, props)` 创建具有给定原型的新对象， 可选附加 `props` 作为 `own` 的属性。 <br/>
基本上，和 `Object.create` 一样， 但是没有所有的属性描述符。

```js
var moe = _.create(Stooge.prototype, {name: "Moe"});
```

## functions
`_.functions(object)` Alias: methods 返回一个对象里所有的方法名, 而且是已经排序的 <br/>
— 也就是说, 对象里每个方法(属性值是一个函数)的名称.

```js
_.functions(_);
=> ["all", "any", "bind", "bindAll", "clone", "compact", "compose" ...
```

## findKey
`_.findKey(object, predicate, [context])` Similar to `_.findIndex` but for keys in objects. <br/>
Returns the key where the predicate truth test passes or undefined.

## extend
`_.extend(destination, *sources)` 复制 `source` 对象中的所有属性覆盖到 `destination` 对象上，并且返回 `destination` 对象. <br/>
复制是按顺序的, 所以后面的对象属性会把前面的对象属性覆盖掉(如果有重复).

```js
_.extend({name: 'moe'}, {age: 50});
=> {name: 'moe', age: 50}
```

extendOwn
_.extendOwn(destination, *sources) Alias: assign 类似于 extend, 但只复制自己的属性覆盖到目标对象。（注：不包括继承过来的属性）

pick
_.pick(object, *keys) 返回一个object副本，只过滤出keys(有效的键组成的数组)参数指定的属性值。或者接受一个判断函数，指定挑选哪个key。

_.pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age');
=> {name: 'moe', age: 50}
_.pick({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
  return _.isNumber(value);
});
=> {age: 50}
omit
_.omit(object, *keys) 返回一个object副本，只过滤出除去keys(有效的键组成的数组)参数指定的属性值。 或者接受一个判断函数，指定忽略哪个key。

_.omit({name: 'moe', age: 50, userid: 'moe1'}, 'userid');
=> {name: 'moe', age: 50}
_.omit({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
  return _.isNumber(value);
});
=> {name: 'moe', userid: 'moe1'}
defaults
_.defaults(object, *defaults) 用defaults对象填充object 中的undefined属性。 并且返回这个object。一旦这个属性被填充，再使用defaults方法将不会有任何效果。（感谢@一任风月忆秋年的拍砖）

var iceCream = {flavor: "chocolate"};
_.defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"});
=> {flavor: "chocolate", sprinkles: "lots"}
clone
_.clone(object) 创建 一个浅复制（浅拷贝）的克隆object。任何嵌套的对象或数组都通过引用拷贝，不会复制。

_.clone({name: 'moe'});
=> {name: 'moe'};
tap
_.tap(object, interceptor) 用 object作为参数来调用函数interceptor，然后返回object。这种方法的主要意图是作为函数链式调用 的一环, 为了对此对象执行操作并返回对象本身。

_.chain([1,2,3,200])
  .filter(function(num) { return num % 2 == 0; })
  .tap(alert)
  .map(function(num) { return num * num })
  .value();
=> // [2, 200] (alerted)
=> [4, 40000]
has
_.has(object, key) 对象是否包含给定的键吗？等同于object.hasOwnProperty(key)，但是使用hasOwnProperty 函数的一个安全引用，以防意外覆盖。

_.has({a: 1, b: 2, c: 3}, "b");
=> true
property
_.property(key) 返回一个函数，这个函数返回任何传入的对象的key属性。

var stooge = {name: 'moe'};
'moe' === _.property('name')(stooge);
=> true
propertyOf
_.propertyOf(object) 和_.property相反。需要一个对象，并返回一个函数,这个函数将返回一个提供的属性的值。

var stooge = {name: 'moe'};
_.propertyOf(stooge)('name');
=> 'moe'
matcher
_.matcher(attrs) 返回一个断言函数，这个函数会给你一个断言可以用来辨别给定的对象是否匹配attrs指定键/值属性。

var ready = _.matcher({selected: true, visible: true});
var readyToGoList = _.filter(list, ready);
isEqual
_.isEqual(object, other) 执行两个对象之间的优化深度比较，确定他们是否应被视为相等。

var stooge = {name: 'moe', luckyNumbers: [13, 27, 34]};
var clone  = {name: 'moe', luckyNumbers: [13, 27, 34]};
stooge == clone;
=> false
_.isEqual(stooge, clone);
=> true
isMatch
_.isMatch(object, properties) 告诉你properties中的键和值是否包含在object中。

var stooge = {name: 'moe', age: 32};
_.isMatch(stooge, {age: 32});
=> true
isEmpty
_.isEmpty(object) 如果object 不包含任何值(没有可枚举的属性)，返回true。 对于字符串和类数组（array-like）对象，如果length属性为0，那么_.isEmpty检查返回true。

_.isEmpty([1, 2, 3]);
=> false
_.isEmpty({});
=> true
isElement
_.isElement(object) 如果object是一个DOM元素，返回true。

_.isElement(jQuery('body')[0]);
=> true
isArray
_.isArray(object) 如果object是一个数组，返回true。

(function(){ return _.isArray(arguments); })();
=> false
_.isArray([1,2,3]);
=> true
isObject
_.isObject(value) 如果object是一个对象，返回true。需要注意的是JavaScript数组和函数是对象，字符串和数字不是。

_.isObject({});
=> true
_.isObject(1);
=> false
isArguments
_.isArguments(object) 如果object是一个参数对象，返回true。

(function(){ return _.isArguments(arguments); })(1, 2, 3);
=> true
_.isArguments([1,2,3]);
=> false
isFunction
_.isFunction(object) 如果object是一个函数（Function），返回true。

_.isFunction(alert);
=> true
isString
_.isString(object) 如果object是一个字符串，返回true。

_.isString("moe");
=> true
isNumber
_.isNumber(object) 如果object是一个数值，返回true (包括 NaN)。

_.isNumber(8.4 * 5);
=> true
isFinite
_.isFinite(object) 如果object是一个有限的数字，返回true。

_.isFinite(-101);
=> true

_.isFinite(-Infinity);
=> false
isBoolean
_.isBoolean(object) 如果object是一个布尔值，返回true，否则返回false。

_.isBoolean(null);
=> false
isDate
_.isDate(object) Returns true if object is a Date.

_.isDate(new Date());
=> true
isRegExp
_.isRegExp(object) 如果object是一个正则表达式，返回true。

_.isRegExp(/moe/);
=> true
isError
_.isError(object) 如果object继承至 Error 对象，那么返回 true。

try {
  throw new TypeError("Example");
} catch (o_O) {
  _.isError(o_O)
}
=> true
isNaN
_.isNaN(object) 如果object是 NaN，返回true。 注意： 这和原生的isNaN 函数不一样，如果变量是undefined，原生的isNaN 函数也会返回 true 。

_.isNaN(NaN);
=> true
isNaN(undefined);
=> true
_.isNaN(undefined);
=> false
isNull
_.isNull(object) 如果object的值是 null，返回true。

_.isNull(null);
=> true
_.isNull(undefined);
=> false
isUndefined
_.isUndefined(value) 如果value是undefined，返回true。

_.isUndefined(window.missingVariable);
=> true

























































































