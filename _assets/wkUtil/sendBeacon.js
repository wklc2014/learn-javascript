/*
 * 卸载文档之前，向服务器发送数据
 * 必须是 post 请求
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon
 */
function sendBeacon(url, data, options) {
  if (!url) {
    console.error('function sendBeacon>>> url 不能为空！')
    return;
  }

  // 传 FormData 类型数据
  var formdata = new FormData();
  for(var key in data) {
    formdata.append(key, data[key]);
  }

  // 检测浏览器是否支持 sendBeacon 方法
  if (navigator && navigator.sendBeacon) {
    navigator.sendBeacon(url, formdata);
  }

  // 检测浏览器是否支持 XMLHttpRequest
  else if (XMLHttpRequest) {
    // 发起同步的 XMLHttpRequest POST 请求
    var client = new XMLHttpRequest();
    // 第三个参数表明是同步的 xhr
    client.open("POST", url, false);
    var contentType = options.contentType || "application/x-www-form-urlencoded;charset=UTF-8";
    client.setRequestHeader("Content-Type", contentType);
    client.send(formdata);
  }

  // 不支持该功能
  else {
    console.error('function sendBeacon>>> 不支持该功能！')
  }
}

export default sendBeacon;
