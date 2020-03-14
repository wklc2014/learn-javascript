# 数组 Array

## 拆分数组
### _.chunk(array, [size=1])

+ 将数组拆分成多个 size 长度的块，并组成一个新数组。 
+ 如果数组无法被分割成全部等长的块，那么最后剩余的元素将组成一个块。

|参数|类型|描述|默认值|
|--	|--	|--	|-- |
|array|Array|需要被处理的数组| |
|size|number|每个块的长度| 1 |


**返回值**
+ （Array）：返回新的数组块。


**例子**
```js
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
 
_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
```

--------------------------------------------------


## 过滤数组
### _.compact(array)

+ 创建一个新数组，包含原数组中所有的非假值元素。
+ 例如 false, null, 0, "", undefined, 和 NaN 都是被认为是“假值”。

|参数|类型|描述|默认值|
|--	|--	|--	|-- |
|array|Array|待处理的数组| |


**返回值**
+ 返回过滤掉假值的新数组

**例子**
```js
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
```

--------------------------------------------------

### _.difference(array, [values])

+ 创建一个具有唯一 `array` 值的数组，每个值不包含在其他给定的数组中。
+ 即创建一个新数组，这个数组中的值，为第一个数组（array 参数）排除了给定数组中的值。
+ 该方法使用 `SameValueZero` 做相等比较。
+ 结果值的顺序是由第一个数组中的顺序确定。 

|参数|类型|描述|默认值|
|-- |-- |-- |-- |
|array|Array|要检查的数组| |
|[values]| (...Array)|排除的值| |

**返回值**
+ 返回一个过滤值后的新数组。

**例子**
```js
_.difference([3, 2, 1, 1], [4, 2]);
// => [3, 1, 1]
```

--------------------------------------------------

### _.differenceBy(array, [values], [iteratee])

+ 这个方法类似 `_.difference` ，除了它接受一个 `iteratee` （迭代器）
+ 迭代器调用 `array` 和 `values` 中的每个元素，以产生比较的标准。
+ 结果值是从第一个数组 `array` 中选择。
+ `iteratee` 会调用一个参数：(`value`)。
+ （首先使用迭代器分别迭代 `array` 和 `values` 中的每个元素，返回的值作为比较值）。

|参数|类型|描述|默认值|
|-- |-- |-- |-- |
|array|Array|要检查的数组| |
|[values]| (...Array)|排除的值| |
|[iteratee]| Function|迭代器|_.identity |

**返回值**
+ 返回一个过滤值后的新数组。

**例子**
```js
var list_1 = [2, 'a', 'b', 'c'];
var list_2 = [1, 2, 3];
var a = _.differenceBy(list_1, list_2, function(value) {
  if (value === 3) {
    return 'a';
  }
  if (value === 'c') {
    return 1;
  }
  return value;
});
a >>> ["b"]
```
--------------------------------------------------

### _.differenceWith(array, [values], [comparator])

+ 这个方法类似 `_.difference` ，除了它接受一个 `comparator` （比较器），
+ 它调用比较 `array` 和 `values` 中的元素。 结果值是从第一数组中选择。
+ `comparator` 调用参数有两个：(`arrVal`, `othVal`)。
+ 比较器返回 `false`，值不过滤；
+ 比较器返回 `true`，值过滤掉。

>  返回一个过滤值后的新数组。

```js
var obj = {
	a: 1,
	b: 2,
	c: 3,
	d: 4,
	e: 5,
	f: 6,
}
var list_1 = ['a', 'b', 'c', 'd', 'e', 'f'];
var list_2 = [1, 2, 3];
var a = _.differenceWith(list_1, list_2, function(a, b) {
	let bool = false;
	if (typeof a === 'string' && typeof b === 'number') {
		if (obj[a] === b) {
			bool = true;
		}
	}
	return bool;
});
a>>> ["d", "e", "f"]
```

--------------------------------------------------


### _.drop(array, [n=1])

+ 创建一个切片数组，去除 `array` 前面的n个元素。（ `n` 默认值为1。）

> 返回 `array` 剩余切片。

```js
_.drop([1, 2, 3]);
// => [2, 3]
 
_.drop([1, 2, 3], 2);
// => [3]
 
_.drop([1, 2, 3], 5);
// => []
 
_.drop([1, 2, 3], 0);
// => [1, 2, 3]
```

--------------------------------------------------

### _.dropRight(array, [n=1])

+ 创建一个切片数组，去除 `array` 尾部的 `n` 个元素。（ `n` 默认值为1。）

> 返回 `array` 剩余切片。

```js
_.dropRight([1, 2, 3]);
// => [1, 2]
 
_.dropRight([1, 2, 3], 2);
// => [1]
 
_.dropRight([1, 2, 3], 5);
// => []
 
_.dropRight([1, 2, 3], 0);
// => [1, 2, 3]
```

--------------------------------------------------

### _.dropRightWhile(array, [predicate])

+ 创建一个切片数组，去除 `array` 中从 `predicate` 返回 `false` 开始到尾部的部分。
+ `predicate` 会传入3个参数： (value, index, array)。

> 返回 `array` 剩余切片。

```js
var users = [
  { 'user': 'fred',    'active': false },
  { 'user': 'barney',  'active': true },
  { 'user': 'pebbles', 'active': false }
];
 
_.dropRightWhile(users, function(o) { return !o.active; });
// => objects for ['fred', 'barney']
 
// The `_.matches` iteratee shorthand.
_.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
// => objects for ['barney', 'fred']
 
// The `_.matchesProperty` iteratee shorthand.
_.dropRightWhile(users, ['active', false]);
// => objects for ['barney']
 
// The `_.property` iteratee shorthand.
_.dropRightWhile(users, 'active');
// => objects for ['barney', 'fred', 'pebbles']
```

--------------------------------------------------

### _.dropWhile(array, [predicate])

+ 创建一个切片数组，去除`array`中从起点开始到 `predicate` 返回 `false` 结束部分。
+ predicate 会传入3个参数： (value, index, array)。

> 返回`array`剩余切片。

```javascript
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
 
_.dropWhile(users, function(o) { return !o.active; });
// => objects for ['pebbles']
 
// The `_.matches` iteratee shorthand.
_.dropWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['fred', 'pebbles']
 
// The `_.matchesProperty` iteratee shorthand.
_.dropWhile(users, ['active', false]);
// => objects for ['pebbles']
 
// The `_.property` iteratee shorthand.
_.dropWhile(users, 'active');
// => objects for ['barney', 'fred', 'pebbles']
```

--------------------------------------------------
### _.initial(array)

+ 获取数组array中除了最后一个元素之外的所有元素
+ （去除数组array中的最后一个元素）。

> 返回截取后的数组array。

```js
_.initial([1, 2, 3]);
// => [1, 2]
```

--------------------------------------------------

### _.without(array, [values])

+ 创建一个剔除所有给定值的新数组，
+ 剔除值的时候，使用 SameValueZero 做相等比较。

> 返回过滤值后的新数组

```javascript
_.without([2, 1, 2, 3], 1, 2);
// => [3]
```

--------------------------------------------------

## 填充、替换数组
### _.fill(array, value, [start=0], [end=array.length])

+ 使用 value 值来填充（替换） array，
+ 从start位置开始, 到end位置结束
+ （但不包含end位置）。

**这个方法会改变 array（不是创建新数组）。**

```js
var array = [1, 2, 3];
 
_.fill(array, 'a');
console.log(array);
// => ['a', 'a', 'a']
 
_.fill(Array(3), 2);
// => [2, 2, 2]
 
_.fill([4, 6, 8, 10], '*', 1, 3);
// => [4, '*', '*', 10]
```
--------------------------------------------------

## 查找数组
### _.findIndex(array, [predicate], [fromIndex=0])

+ 该方法类似 _.find，
+ 区别是该方法返回第一个通过 predicate 判断为真值的元素的索引值（index），
+ 而不是元素本身。

**返回找到元素的 索引值（index），否则返回 -1。**

```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
 
_.findIndex(users, function(o) { return o.user == 'barney'; });
// => 0
 
// The `_.matches` iteratee shorthand.
_.findIndex(users, { 'user': 'fred', 'active': false });
// => 1
 
// The `_.matchesProperty` iteratee shorthand.
_.findIndex(users, ['active', false]);
// => 0
 
// The `_.property` iteratee shorthand.
_.findIndex(users, 'active');
// => 2
```

--------------------------------------------------

### _.findLastIndex(array, [predicate], [fromIndex=array.length-1])

+ 这个方式类似 _.findIndex， 
+ 区别是它是从右到左的迭代集合array中的元素。

```js
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
 
_.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
// => 2
 
// The `_.matches` iteratee shorthand.
_.findLastIndex(users, { 'user': 'barney', 'active': true });
// => 0
 
// The `_.matchesProperty` iteratee shorthand.
_.findLastIndex(users, ['active', false]);
// => 2
 
// The `_.property` iteratee shorthand.
_.findLastIndex(users, 'active');
// => 0
```

--------------------------------------------------

### _.head(array)
### _.first(array)

+ 获取数组 array 的第一个元素。

> 返回数组 array的第一个元素。

```javascript
_.head([1, 2, 3]);
// => 1
 
_.head([]);
// => undefined
```

--------------------------------------------------

### _.indexOf(array, value, [fromIndex=0])

+ 使用 SameValueZero 等值比较，
+ 返回首次 value 在数组array中被找到的 索引值， 
+ 如果 fromIndex 为负值，将从数组array尾端索引进行匹配。

> 返回 值value在数组中的索引位置, 没有找到为返回-1。

```js
_.indexOf([1, 2, 1, 2], 2);
// => 1
 
// Search from the `fromIndex`.
_.indexOf([1, 2, 1, 2], 2, 2);
// => 3
```
--------------------------------------------------

### _.lastIndexOf(array, value, [fromIndex=array.length-1])

+ 这个方法类似 _.indexOf ，区别是它是从右到左遍历array的元素。

> 返回匹配值的索引值，否则返回 -1。

```js
_.lastIndexOf([1, 2, 1, 2], 2);
// => 3
 
// Search from the `fromIndex`.
_.lastIndexOf([1, 2, 1, 2], 2, 2);
// => 1
```
--------------------------------------------------

### _.last(array)

+ 获取array中的最后一个元素。

> 返回array中的最后一个元素

```javascript
_.last([1, 2, 3]);
// => 3
```

--------------------------------------------------

### _.nth(array, [n=0])

+ 获取array数组的第n个元素。
+ 如果n为负数，则返回从数组结尾开始的第n个元素。

> 获取array数组的第n个元素。

```js
var array = ['a', 'b', 'c', 'd'];
 
_.nth(array, 1);
// => 'b'
 
_.nth(array, -2);
// => 'c';
```

--------------------------------------------------
## 合并数组
### _.concat(array, [values])

+ 创建一个新数组，将 `array` 与任何数组 或 值连接在一起。

|参数|类型|描述|默认值|
|-- |-- |-- |-- |
|array|Array|被连接的数组| |
|[values]|(...*)|连接的值| |

**返回值**
+ 返回连接后的新数组。

**例子**
```javascript
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);
 
console.log(other);
// => [1, 2, 3, [4]]
 
console.log(array);
// => [1]
```
--------------------------------------------------

### _.join(array, [separator=','])

+ 将 array 中的所有元素转换为由 separator 分隔的字符串。

> 返回连接字符串。

```javascript
_.join(['a', 'b', 'c'], '~');
// => 'a~b~c'
```

--------------------------------------------------

### _.flatten(array) 

+ 减少一级array嵌套深度。

> 返回减少嵌套层级后的新数组。

```js
_.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]
```

### _.flattenDeep(array)

+ 将array递归为一维数组。

> 返回一个的新一维数组。

```js
_.flattenDeep([1, [2, [3, [4]], 5]]);
// => [1, 2, 3, 4, 5]
```
### _.flattenDepth(array, [depth=1])

+ 根据 depth 递归减少 array 的嵌套层级

> 返回减少嵌套层级后的新数组。

```js
var array = [1, [2, [3, [4]], 5]];
 
_.flattenDepth(array, 1);
// => [1, 2, [3, [4]], 5]
 
_.flattenDepth(array, 2);
// => [1, 2, 3, [4], 5]
```

### _.fromPairs(pairs)

+ 与 _.toPairs正好相反；
+ 这个方法返回一个由键值对pairs构成的对象。

> 返回一个新对象。

```js
_.fromPairs([['fred', 30], ['barney', 40]]);
// => { 'fred': 30, 'barney': 40 }
```


--------------------------------------------------
### _.intersection([arrays])

+ 创建唯一值的数组，这个数组包含所有给定数组都包含的元素，
+ 使用 SameValueZero进行相等性比较。
+ （可以理解为给定数组的交集）

> 返回一个包含所有传入数组交集元素的新数组。

```js
_.intersection([2, 1], [4, 2], [1, 2]);
// => [2]
```

--------------------------------------------------
### _.intersectionBy([arrays], [iteratee=_\.identity])

+ 这个方法类似 _.intersection，
+ 区别是它接受一个 iteratee 调用每一个arrays的每个值以产生一个值，
+ 通过产生的值进行了比较。结果值是从第一数组中选择。
+ iteratee 会传入一个参数：(value)。

> 返回一个包含所有传入数组交集元素的新数组。

```js
_.intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// => [2.1]
 
// The `_.property` iteratee shorthand.
_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }]
```

--------------------------------------------------

### _.intersectionWith([arrays], [comparator])

+ 这个方法类似 _.intersection，
+ 区别是它接受一个 comparator 调用比较arrays中的元素。
+ 结果值是从第一数组中选择。
+ comparator 会传入两个参数：(arrVal, othVal)。

> 返回一个包含所有传入数组交集元素的新数组。

```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.intersectionWith(objects, others, _.isEqual);
// => [{ 'x': 1, 'y': 2 }]
```

--------------------------------------------------

## 删除数组中元素

### _.pull(array, [values])

+ 删除数组 `array` 中所有和给定值相等的元素，
+ 使用 SameValueZero 进行全等比较。 

> 和 _.without 方法不同，这个方法会改变数组。<br/>
> 使用 _.remove 从一个数组中移除元素。<br/>
> 返回 `array`

```js
var array = [1, 2, 3, 1, 2, 3];
 
_.pull(array, 2, 3);
console.log(array);
// => [1, 1]
```
--------------------------------------------------

### _.pullAll(array, values)

+ 这个方法类似 _.pull，
+ 区别是这个方法接收一个要移除值的数组。 

**不同于 _.difference, 这个方法会改变数组 array。**

```js
var array = [1, 2, 3, 1, 2, 3];
 
_.pullAll(array, [2, 3]);
console.log(array);
// => [1, 1]
```

--------------------------------------------------

### _.pullAllBy(array, values, [iteratee=_.identity])

+ 这个方法类似于 _.pullAll ，
+ 区别是这个方法接受一个 iteratee（迭代函数） 调用 array 和 values的每个值以产生一个值，
+ 通过产生的值进行了比较。
+ iteratee 会传入一个参数： (value)。 

> 不同于 _.differenceBy, 这个方法会改变数组 array。

```js
var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
 
_.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
console.log(array);
// => [{ 'x': 2 }]
```

--------------------------------------------------

### _.pullAllWith(array, values, [comparator])

+ 这个方法类似于 _.pullAll，
+ 区别是这个方法接受 comparator 调用array中的元素和values比较。
+ comparator 会传入两个参数：(arrVal, othVal)。 

> 和 _.differenceWith 不同, 这个方法会改变数组 array。

```js
var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
 
_.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
console.log(array);
// => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
```

--------------------------------------------------

### _.pullAt(array, [indexes])

+ 根据索引 indexes，移除array中对应的元素，并返回被移除元素的数组。 

**Note: **和 _.at不同, 这个方法会改变数组 array。



参数
array (Array): 要修改的数组。
[indexes] (...(number|number[])): 要移除元素的索引。
返回值
(Array): 返回移除元素组成的新数组。

```js
var array = [5, 10, 15, 20];
var evens = _.pullAt(array, 1, 3);
 
console.log(array);
// => [5, 15]
 
console.log(evens);
// => [10, 20]

```
### _.remove(array, [predicate=_.identity])

+ 移除数组中 predicate（断言）返回为真值的所有元素，
+ 并返回移除元素组成的数组。
+ predicate（断言） 会传入3个参数： (value, index, array)。 

> 和 _.filter 不同, 这个方法会改变数组 array。使用 _.pull 来根据提供的value值从数组中移除元素。

> 返回移除元素组成的新数组。

```js
var array = [1, 2, 3, 4];
var evens = _.remove(array, function(n) {
  return n % 2 == 0;
});
 
console.log(array);
// => [1, 3]
 
console.log(evens);
// => [2, 4]
```
### _.reverse(array)

+ 反转array，使得第一个元素变为最后一个元素，
+ 第二个元素变为倒数第二个元素，
+ 依次类推。 

> 这个方法会改变原数组 array，基于 Array#reverse.

```js
var array = [1, 2, 3];
 
_.reverse(array);
// => [3, 2, 1]
 
console.log(array);
// => [3, 2, 1]
```
### _.slice(array, [start=0], [end=array.length])

+ 裁剪数组array，从 start 位置开始到 end 结束，但不包括 end 本身的位置。 

> 这个方法用于代替 Array#slice 来确保数组正确返回。

> 返回 数组array 裁剪部分的新数组。

### _.sortedIndex(array, value)

+ 使用二进制的方式检索来决定 value 值，
+ 应该插入到数组中，
+ 尽可能小的索引位置，
+ 以保证array的排序。

> 返回 value 值 应该在数组array中插入的索引位置 index。

```js
_.sortedIndex([30, 50], 40);
// => 1
```

### _.sortedIndexBy(array, value, [iteratee=_.identity])

+ 这个方法类似 _.sortedIndex ，
+ 除了它接受一个 iteratee （迭代函数），
+ 调用每一个数组（array）元素，
+ 返回结果和value 值比较来计算排序。
+ iteratee 会传入一个参数：(value)。

> 返回 value值 应该在数组array中插入的索引位置 index。

```js
var objects = [{ 'x': 4 }, { 'x': 5 }];
 
_.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
// => 0
 
// The `_.property` iteratee shorthand.
_.sortedIndexBy(objects, { 'x': 4 }, 'x');
// => 0
```

### _.sortedIndexOf(array, value)

+ 这个方法类似 _.indexOf，除了它是在已经排序的数组array上执行二进制检索。

> 返回匹配值的索引位置，否则返回 -1。

```js
_.sortedIndexOf([4, 5, 5, 5, 6], 5);
// => 1
```

### _.sortedLastIndex(array, value)

+ 此方法类似于 _.sortedIndex，除了 它返回 value值 在 array 中尽可能大的索引位置（index）。

> 返回 value值 应该在数组array中插入的索引位置 index。

```js
_.sortedLastIndex([4, 5, 5, 5, 6], 5);
// => 4
```
### _.sortedLastIndexBy(array, value, [iteratee])

+ 这个方法类似 _.sortedLastIndex ，
+ 除了它接受一个 iteratee （迭代函数），
+ 调用每一个数组（array）元素，返回结果和value 值比较来计算排序。
+ iteratee 会传入一个参数：(value)。

> 返回 value值 应该在数组array中插入的索引位置 index。

```js
var objects = [{ 'x': 4 }, { 'x': 5 }];
 
_.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
// => 1
 
// The `_.property` iteratee shorthand.
_.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
// => 1
```
### _.sortedLastIndexOf(array, value)

+ 这个方法类似 _.lastIndexOf，除了它是在已经排序的数组array上执行二进制检索。

> 返回匹配值的索引位置，否则返回 -1。

```js
_.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
// => 3
```
### _.sortedUniq(array)

+ 这个方法类似 _.uniq，除了它会优化排序数组。

> 返回一个新的不重复的数组。

```js
_.sortedUniq([1, 1, 2]);
// => [1, 2]
```
###_.sortedUniqBy(array, [iteratee])

+ 这个方法类似 _.uniqBy，除了它会优化排序数组。

> 返回一个新的不重复的数组。

```js
_.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
// => [1.1, 2.3]
```
### _.tail(array)

+ 获取除了array数组第一个元素以外的全部元素。

> 返回 array 数组的切片（除了array数组第一个元素以外的全部元素）。

```js
_.tail([1, 2, 3]);
// => [2, 3]
```
### _.take(array, [n=1])

+ 创建一个数组切片，从array数组的起始元素开始提取n个元素。

> 返回 array 数组的切片（从起始元素开始n个元素）。

```js
_.take([1, 2, 3]);
// => [1]
 
_.take([1, 2, 3], 2);
// => [1, 2]
 
_.take([1, 2, 3], 5);
// => [1, 2, 3]
 
_.take([1, 2, 3], 0);
// => []
```
### _.takeRight(array, [n=1])

+ 创建一个数组切片，从array数组的最后一个元素开始提取n个元素。

> 返回 array 数组的切片（从结尾元素开始n个元素）。

```js
_.takeRight([1, 2, 3]);
// => [3]
 
_.takeRight([1, 2, 3], 2);
// => [2, 3]
 
_.takeRight([1, 2, 3], 5);
// => [1, 2, 3]
 
_.takeRight([1, 2, 3], 0);
// => []
```
### _.takeRightWhile(array, [predicate=_.identity])

+ 从array数组的最后一个元素开始提取元素，直到 predicate 返回假值。predicate 会传入三个参数： (value, index, array)。

> 返回 array 数组的切片。

```js
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
 
_.takeRightWhile(users, function(o) { return !o.active; });
// => objects for ['fred', 'pebbles']
 
// The `_.matches` iteratee shorthand.
_.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
// => objects for ['pebbles']
 
// The `_.matchesProperty` iteratee shorthand.
_.takeRightWhile(users, ['active', false]);
// => objects for ['fred', 'pebbles']
 
// The `_.property` iteratee shorthand.
_.takeRightWhile(users, 'active');
// => []
```
### _.takeWhile(array, [predicate=_.identity])

+ 从array数组的起始元素开始提取元素，，直到 predicate 返回假值。predicate 会传入三个参数： (value, index, array)。

> 返回 array 数组的切片。

```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false},
  { 'user': 'pebbles', 'active': true }
];
 
_.takeWhile(users, function(o) { return !o.active; });
// => objects for ['barney', 'fred']
 
// The `_.matches` iteratee shorthand.
_.takeWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['barney']
 
// The `_.matchesProperty` iteratee shorthand.
_.takeWhile(users, ['active', false]);
// => objects for ['barney', 'fred']
 
// The `_.property` iteratee shorthand.
_.takeWhile(users, 'active');
// => []
```
### _.union([arrays])

+ 创建一个按顺序排列的唯一值的数组。所有给定数组的元素值使用 SameValueZero做等值比较。（ arrays（数组）的并集，按顺序返回，返回数组的元素是唯一的）

> 返回一个新的联合数组。

```js
_.union([2], [1, 2]);
// => [2, 1]
```
### _.unionBy([arrays], [iteratee=_.identity])

+ 这个方法类似 _.union ，除了它接受一个 iteratee （迭代函数），调用每一个数组（array）的每个元素以产生唯一性计算的标准。iteratee 会传入一个参数：(value)。

> 返回一个新的联合数组。

```js
_.unionBy([2.1], [1.2, 2.3], Math.floor);
// => [2.1, 1.2]
 
// The `_.property` iteratee shorthand.
_.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```
### _.unionWith([arrays], [comparator])

+ 这个方法类似 _.union， 除了它接受一个 comparator 调用比较arrays数组的每一个元素。 comparator 调用时会传入2个参数： (arrVal, othVal)。

> 返回一个新的联合数组。

```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.unionWith(objects, others, _.isEqual);
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
```
### _.uniq(array)

+ 创建一个去重后的array数组副本。使用了 SameValueZero 做等值比较。只有第一次出现的元素才会被保留。

> 返回新的去重后的数组。

```js
_.uniq([2, 1, 2]);
// => [2, 1]
```
### _.uniqBy(array, [iteratee=_.identity])

+ 这个方法类似 _.uniq ，除了它接受一个 iteratee （迭代函数），调用每一个数组（array）的每个元素以产生唯一性计算的标准。iteratee 调用时会传入一个参数：(value)。

> 返回新的去重后的数组。

```js
_.uniqBy([2.1, 1.2, 2.3], Math.floor);
// => [2.1, 1.2]
 
// The `_.property` iteratee shorthand.
_.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```
### _.uniqWith(array, [comparator])

+ 这个方法类似 _.uniq， 除了它接受一个 comparator 调用比较arrays数组的每一个元素。 comparator 调用时会传入2个参数： (arrVal, othVal)。

> 返回新的去重后的数组。

```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.uniqWith(objects, _.isEqual);
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
```
### _.unzip(array)

+ 这个方法类似于 _.zip，
+ 除了它接收分组元素的数组，并且创建一个数组，分组元素到打包前的结构。
+ 返回数组的第一个元素包含所有的输入数组的第一元素，
+ 第一个元素包含了所有的输入数组的第二元素，
+ 依此类推。

> 返回重组元素的新数组。

```js
var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
// => [['fred', 30, true], ['barney', 40, false]]
 
_.unzip(zipped);
// => [['fred', 'barney'], [30, 40], [true, false]]
```
### _.unzipWith(array, [iteratee=_.identity])

+ 此方法类似于 _.unzip，除了它接受一个iteratee指定重组值应该如何被组合。iteratee 调用时会传入每个分组的值： (...group)。

> 返回重组元素的新数组。

```js
var zipped = _.zip([1, 2], [10, 20], [100, 200]);
// => [[1, 10, 100], [2, 20, 200]]
 
_.unzipWith(zipped, _.add);
// => [3, 30, 300]
```

--------------------------------------------------
## 数组过滤
### _.xor([arrays])

+ 创建一个给定数组唯一值的数组，使用 symmetric difference 做等值比较。
+ 返回值的顺序取决于他们数组的出现顺序。

**返回值**
+ 返回过滤值后的新数组。

**例子**
```js
_.xor([2, 1], [2, 3]);
// => [1, 3]
```
--------------------------------------------------
### _.xorBy([arrays], [iteratee])

+ 这个方法类似 _.xor ，除了它接受 iteratee（迭代器），
+ 这个迭代器 调用每一个 arrays（数组）的每一个值，以生成比较的新值。
+ iteratee 调用一个参数：(value).

> 返回过滤值后的新数组。

```js
_.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [1.2, 3.4]
 
// The `_.property` iteratee shorthand.
_.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 2 }]
```
--------------------------------------------------
### _.xorWith([arrays], [comparator])

+ 该方法是像 _.xor，除了它接受一个 comparator （比较器），以调用比较数组的元素。
+ comparator 调用2个参数：(arrVal, othVal).

> 返回过滤值后的新数组。

```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.xorWith(objects, others, _.isEqual);
// => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
```
--------------------------------------------------
## 数组分组
### _.zip([arrays])

+ 创建一个分组元素的数组，
+ 数组的第一个元素包含所有给定数组的第一个元素，
+ 数组的第二个元素包含所有给定数组的第二个元素，以此类推。

|参数|类型|描述|默认值|
|-- |-- |-- |-- |
|[arrays]|(...Array)|要分组处理的数组| |

**返回值**
+ 返回分组元素的新数组

**例子**
```js
_.zip(['fred', 'barney'], [30, 40], [true, false]);
// => [['fred', 30, true], ['barney', 40, false]]
```
--------------------------------------------------
### _.zipObject([props], [values])

+ 这个方法类似 `_.fromPairs`，除了它接受2个数组，
+ 第一个数组中的值作为属性标识符（属性名），
+ 第二个数组中的值作为相应的属性值。

|参数|类型|描述|默认值|
|-- |-- |-- |-- |
|props|Array|属性名数组|[] |
|values|Array|属性值数组|[] |

**返回值**
+ 返回一个新的对象

**例子**
```js
_.zipObject(['a', 'b'], [1, 2]);
// => { 'a': 1, 'b': 2 }
```
--------------------------------------------------
### _.zipObjectDeep([props], [values])

+ 这个方法类似 _.zipObject，除了它支持属性路径。

|参数|类型|描述|默认值|
|-- |-- |-- |-- |
|props|Array|属性标识符|[] |
|values|Array|属性值数组|[] |

**返回值**
+ 返回新对象。

**例子**
```js
_.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
// => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
```
--------------------------------------------------
### _.zipWith([arrays], [iteratee])

+ 这个方法类似于 _.zip，不同之处在于它接受一个 iteratee（迭代函数），来 指定分组的值应该如何被组合。 该iteratee调用每个组的元素： (...group).

|参数|类型|描述|默认值|
|-- |-- |-- |-- |
|[arrays]|Array|要处理的数组| |
|[iteratee]|Function|返回用来组合分组的值|_.identity |

**返回值**
+ 返回分组元素的新数组。

**例子**
```js
_.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
  return a + b + c;
});
// => [111, 222]
```




