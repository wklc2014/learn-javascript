# Lang 56
```javascript
_.clone(value); // 浅拷贝
_.cloneDeep(value); // 深拷贝
_.cloneDeepWith(value, [customizer]); // 递归克隆 value
_.cloneWith(value, function(value index|key, object, stack) {});

_.conformsTo(object, source);

_.eq(value, other); // 是否相等
_.gt(value, other);  // 是否大于
_.gte(value, other); // 是否大于或等于
_.lt(value, other);  // 是否小于
_.lte(value, other); // 是否小于或等于

/**
 * 类型判断
 */
_.isBoolean(value); // 是否是布尔值 or new Boolean

_.isNumber(value);  // 是否是数值 or new Number contain [infinity, -infinity, NaN]
_.isFinite(value);  // 是否是有限数值 not contain [infinity, -infinity, NaN]
_.isInteger(value); // 是否是整数
_.isSafeInteger(value); // 是否是安全整数
_.isLength(value); // 是否为有效的类数组长度
_.isNaN(value);     // 是否是 NaN

_.isString(value); // 是否是字符串 or new String

// 是否是对象
_.isObject(value);  // value != null && (typeof value == 'object' || typeof value == 'function')
_.isObjectLike(value); // value != null && typeof value == 'object'
_.isPlainObject(value); // 是否是普通对象
// 是否是数组
_.isArray(value); // Array.isArray
_.isArrayLike(value); // value != null && isLength(value.length) && !isFunction(value)
_.isArrayLikeObject(value); // isObjectLike(value) && isArrayLike(value)

_.isNil(value);       // 是否是 null 或者 undefined
_.isUndefined(value); // 是否是 undefined
_.isNull(value);      // 是否是 null

_.isArguments(value); // 是否是一个类 arguments 对象
_.isRegExp(value);   // 是否为 RegExp 对象
_.isDate(value);     // 是否是 Date 对象
_.isFunction(value); // 是否是 Function 对象
_.isError(value);    // 是否是一个错误（Error）对象
_.isElement(value); // 是否是可能是 DOM 元素

_.isMap(value); // 是否为一个 Map 对象
_.isSet(value); // 是否是一个 Set 对象
_.isWeakMap(value); // 是否是 WeakMap 对象
_.isWeakSet(value); // 是否是 WeakSet 对象
_.isSymbol(value); // 是否是原始 Symbol
_.isBuffer(value); // 是否是个 buffer
_.isArrayBuffer(value); // 是否是 ArrayBuffer 对象
/**
 * 类型转换
 */
_.castArray(value); // 如果 value 不是数组, 那么强制转为数组
_.toArray(value); // 转换 value 为一个数组
_.toFinite(value); // 转换 value 为一个有限数字
_.toInteger(value); // 转换 value 为一个整数
_.toLength(value); // 转换 value 为用作类数组对象的长度整数
_.toNumber(value); // 转换 value 为一个数字
_.toPlainObject(value); // 转换 value 为普通对象
_.toSafeInteger(value); // 转换 value 为安全整数
_.toString(value); // 转换 value 为字符串。 null 和 undefined 将返回空字符串。-0 将被转换为字符串"-0"

_.isEmpty(value)
_.isEqual(value, other); // 执行深比较来确定两者的值是否相等
_.isEqualWith(value, other, function(objValue, othValue [, index|key, object, other, stack]) {})
_.isMatch(object, source)
_.isMatchWith(object, source, [customizer])
_.isNative(value)
_.isTypedArray(value)
```