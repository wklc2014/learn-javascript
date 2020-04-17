/**
 * 获取url参数
 */
function getUrlParam(name) {

  // 获取 url 中"?"符后的字串
  var search = window.location.search;

  var urlParams = {};

  // search 字符串以 "?" 开头
  if (search.indexOf("?") !== -1) {

    /**
     * 字符串截取
     * str.substring(start, [end]);
     * str.substr(from, [length])
     */
    var str = search.substr(1);

    // 分隔字符串
    var items = str.split("&");
    var length = items.length;

    // 循环数组
    for (var i = 0; i < length; i ++) {
      var item = items[i];
      var arr = item.split("=");
      var key = arr[0];
      var val = arr[1];
      urlParams[key] = encodeURIComponent(val);

      // 如果只获取某一个值
      // 则匹配到后直接跳出循环
      if (name) {
        break;
      }
    }
  }

  if (name) {
    return urlParams[name];
  }

  return urlParams;
}
