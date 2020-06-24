# Array 65

```javascript
/**
 * 根据索引查找数组元素 4
 */
_.first(array); // 返回数组第一个元素
_.head(array);  // 返回数组第一个元素
_.last(array);  // 返回数组最后一个元素
_.nth(array, [n=0]); // 返回数组第 n 个元素

/**
 * 特殊函数 6
 */
_.join(array, [separator=',']); // 数组转字符串 - return string
_.slice(array, [start=0], [end=array.length]); // 截取数组 - return new array
_.chunk(array, [size=1]); // 拆分数组 - return new array
_.concat(array, [values]); // 合并数组或值 - return new array
_.fill(array, value, [start=0], [end=array.length-1]); // 填充数组 - change source array
_.reverse(array); // 反转数组 - change source array

/**
 * 数组过滤 17
 * 返回新数组 
 */
_.compact(array); // 过滤假值 false,0,'',undefined,NAN,null

// 过滤不同的值，排除相同的值
_.difference(array, [values]); // 在 array，且不在 values 中
_.differenceBy(array, [values], function(val) { 
  // 遍历 array 和 values 中的每个元素
  // 返回值作为比较结果
});
_.differenceWith(array, [values], function(arrVal, othVal) { 
  // return true 相同
  // return false 不同 - 保留
});

// 过滤相同的值，排除不同的值 - 求数组交集
_.intersection([arrays]);
_.intersectionBy([arrays], function(value) {
  // 遍历 arrays 中的每个元素
  // 返回值作为比较结果
});
_.intersectionWith([arrays], function(arrVal, othVal) {
  // return true 相同 - 保留
  // return false 不同
});

// 切割数组 - 去掉切割部分
_.drop(array, [n=1]);
_.dropRight(array, [n=1]);
_.dropRightWhile(array, function(value, index, array) { return false });
_.dropWhile(array, function(value, index, array) { return false });

_.initial(array); // 过滤数组最后一个元素 // _.dropRight(array)
_.tail(array); // 过滤数组第一个元素 // _.drop(array)

// 切割数组 - 提取切割部分
_.take(array, [n=1])
_.takeRight(array, [n=1])
_.takeRightWhile(array, function(value, index, array) { return false })
_.takeWhile(array, function(value, index, array) { return false })

/**
 * 删除数组元素 7
 * change source array
 */
_.pull(array, [values]);    // 根据值移除
_.pullAt(array, [indexes]); // 根据索引移除
_.pullAll(array, [values]); // 根据数组中的值移除
_.pullAllBy(array, [values], function(val) {
  // 遍历 array 和 values 中的每个元素
  // 返回值作为比较结果
})
_.pullAllWith(array, [values], function(arrVal, othVal) {
  // return true 要移除
  // return false 不移除
})
// return 移除的值组成的数组
_.remove(array, function(value, index, array) {
  // return true 要移除
  // return false 不移除
})
_.without(array, [values]); // 根据数组中的值移除 - return new array

/**
 * 查找数组索引 4
 * 没有找到返回 -1
 */
_.findIndex(array, function(val) { /* return true 目标值*/ }, [fromIndex=0]);
_.findLastIndex(array, function(val) { /* return true 目标值*/ }, [fromIndex=array.length-1]);
_.indexOf(array, value, [fromIndex=0]);
_.lastIndexOf(array, value, [fromIndex=array.length-1]);


/**
 * 递归减少 array 嵌套 3
 */ 
_.flaten(array)
_.flatenDeep(array)
_.flatenDepth(array, [n=1])

// 返回排序索引 6
_.sortedIndex(array, value)
_.sortedIndexBy(array, [values], function(val) {
  // 遍历 array 和 values 中的每个元素
  // 返回值作为比较结果
})
_.sortedIndexOf(array, value);
_.sortedLastIndex(array, value);
_.sortedLastIndexBy(array, value, [iteratee=_.identity]);
_.sortedLastIndexOf(array, value);

/**
 * 合并多个数组 3 - return new array
 * 1. 合并数组
 * 2. 数组去重 - 重复的 - 保留一个
 * 3. 数组排序
 */
_.union([arrays]);
_.unionBy([arrays], function(val){/* 迭代所有元素，return 计算标准 */});
_.unionWith([arrays], function(arrVal, othVal) { /* */ });

/**
 * 单个数组去重 5
 */
_.uniq(array);
_.uniqBy(array, [iteratee=_.identity]);
_.uniqWith(array, [comparator]);
_.sortedUniq(array);               // 并排序
_.sortedUniqBy(array, [iteratee]); // 并排序

/**合并多个数组
 * return new array 3
 * 1. 合并数组
 * 2. 数组去重 - 重复的 - 删除
 */
_.xor([arrays]);
_.xorBy([arrays], [iteratee=_.identity]);
_.xorWith([arrays], [comparator]);

/**
 * 分组数组 7
 */
// 创建一个分组元素的数组，
// 数组的第一个元素包含所有给定数组的第一个元素，
// 数组的第二个元素包含所有给定数组的第二个元素，以此类推
_.zip([arrays]);
_.zipWith([arrays], [iteratee=_.identity]);

// 返回数组的第一个元素包含所有的输入数组的第一元素，
// 第一个元素包含了所有的输入数组的第二元素，依此类推。
_.unzip(array); 
_.unzipWith(array, [iteratee=_.identity]); // 指定重组值应该如何被组合

// 接受2个数组，第一个数组中的值作为属性属性名，第二个数组中的值作为相应的属性值
_.zipObject([props=[]], [values=[]]);
_.zipObjectDeep([props=[]], [values=[]]); // 支持属性路径

// 返回一个由键值对 pairs 构成的对象
_.fromPairs([[props=[]], [values=[]]]);
```
