# canvas 简介

canvas 是 `HTML5` 新增的绘图元素。

通过 js 代码访问 canvas，
调用绘图函数来动态生成图形。

# canvas 使用

直接用 `width` 和 `height` 属性定义尺寸。

```
<canvas width="300" height="300">
</canvas>
```

## canvas 替换内容

如果浏览器不支持 canvas 标签，
可以显示 canvas 标签内的元素。

```
<canvas width="300" height="300">
  你的浏览器不支持 canvas,请升级你的浏览器。
  <img src="" alt="">
</canvas>
```

## canvas 2d 上下文对象

canvas 创建一个固定大小的画布。

```
var canvas = document.getElementById('canvas');
//获得 2d 上下文对象
var ctx = canvas.getContext('2d');
```

## 检测支持性

```
var canvas = document.getElementById('canvas');

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

## canvas 坐标空间

canvas 的绘图区域（也叫画布）以左上角为起点，叫原点。

画布上所有元素都相对于原点来定位。

## canvas 绘制矩形

```
// 绘制一个填充的矩形
fillRect(x, y, width, height)

// 绘制一个矩形的边框
strockRect(x, y, width, height)

// 清除指定的矩形区域，然后这块区域会变的完全透明。
clearRect(x, y, widh, height)
```

## canvas 绘制路径

1. 创建路径起点；
2. 绘制路径；
3. 闭合路径；
4. 描边或填充绘制图形。

```
// 创建一条路径
ctx.beginPath();

// 把画笔移动到指定的坐标 x, y
ctx.moveTo(x, y);

// 绘制一条从当前位置到指定坐标(x, y)的直线
ctx.lineTo(200, 50);

// 闭合路径。
// 会拉一条从当前点到path起始点的直线。
// 如果当前点与起始点重合，则什么都不做
ctx.closePath();

// 绘制路径
ctx.stroke();
```

> 描边；
> 填充；

## canvas 绘制圆弧

```
arc(x, y, r, startAngle, endAngle, anticlockwise);
```

以 `(x, y)` 为圆心，
以 `r` 为半径，
从 `startAngle` 弧度开始到 `endAngle` 弧度结束。
`anticlosewise` 是布尔值,
`true` 表示逆时针,
`false` 表示顺时针。
(默认是顺时针)

```
arcTo(x1, y1, x2, y2, radius);
```

根据给定的控制点和半径画一段圆弧，
最后再以直线连接两个控制点

## 添加样式和颜色

+ fillStyle = color
设置图形的填充颜色

+ strokeStyle = color
设置图形轮廓的颜色

+ globalAlpha = transparencyValue

## 绘制文本

绘制文本有两个方法：
```
// 在指定的(x,y)位置填充指定的文本(text)，绘制的最大宽度(maxWidth)是可选的
fillText(text, x, y [, maxWidth]);

// 在指定的(x,y)位置绘制文本(text)边框，绘制的最大宽度(maxWidth)是可选的.
strokeText(text, x, y [, maxWidth])
```

### 给文本添加样式

## 绘制图片

+ 创建图片
```
var img = new Image();
img.src = '';
// 脚本执行后图片开始装载
```

+ 绘制图片
```
// 参数1：要绘制的img
// 参数2、3：绘制的img在canvas中的坐标
ctx.drawImage(image, x, y, width, height)
```

考虑到图片是从网络加载，
如果 drawImage 的时候图片还没有完全加载完成，
则什么都不做，
个别浏览器会抛异常。
所以我们应该保证在 img 绘制完成之后再 drawImage。

```
var img = new Image();
img.onload = function() {
  ctx.drawImage(img, 0, 0)
}
img.src = 'myImage.png'; // 设置图片源地址
```

+ 缩放图片
