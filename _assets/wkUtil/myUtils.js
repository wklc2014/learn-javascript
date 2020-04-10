/**
 * 工具函数
 */
/**
 * 判断给定值是否是 Array
 * @param  {Any} value 给定值
 * @return {Boolean}  是否是 Array
 */
function isArray(value){
  return Object.prototype.toString.call(value) === '[object Array]';
}

/**
 * 判断给定值是否是 Object
 * @param  {Any}  value 给定值
 * @return {Boolean}  是否是 Object
 */
function isObject(value){
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 检查给定值是否是 Function
 * @param  {Any}  value 给定值
 * @return {Boolean}  是否是 Function
 */
function isFunction(value){
  return Object.prototype.toString.call(value) === '[object Function]';
  // return typeof value === 'function';
}

/**
 * 检查给定值是否是 Null
 * @param  {Any}  value 给定值
 * @return {Boolean}       是否是 Null
 */
function isNull(value) {
  return value === null;
}

/**
 * 检查给定值是否是 Number
 * @param  {Any}  value 给定值
 * @return {Boolean}       是否是 Number
 */*/
function isNumber(value) {
  return typeof value === 'number';
}

/**
 * 检查给定值是否是 String
 * @param  {Any}  value 给定值
 * @return {Boolean}       是否是 String
 */*/
function isString(value) {
  return typeof value === 'string';
}

/**
 * 检查给定值是否是 Boolean
 * @param  {Any}  value 给定值
 * @return {Boolean}       是否是 Boolean
 */*/
function isBoolean(value) {
  return typeof value === 'boolean';
}

/**
 * 检查给定值是否是 Undefined
 * @param  {Any}  value 给定值
 * @return {Boolean}       是否是 Undefined
 */*/
function isUndefined(value) {
  return typeof value === 'undefined';
}

/**
 * 获取给定值的数据类型
 * @param  {Any} value 给定值
 * @return {String}       给定值的数据类型
 */
function getType(value) {
  if (isArray(value)) return 'array';
  if (isObject(value)) return 'object';
  if (isFunction(value)) return 'function';
  if (isNull(value)) return 'null';
  if (isNumber(value)) return 'number';
  if (isString(value)) return 'string';
  if (isBoolean(value)) return 'boolean';
  if (isUndefined(value)) return 'undefined';
  return '';
}

var myUtils = {
  isArray: isArray,
  isObject: isObject,
  isFunction: isFunction,
}
