# 按钮

三种方式:
+ 使用 `<button>` 元素
+ 使用 `<input>` 元素
+ 使用 `data-role="button"` 的 `<a>` 元素

```html
<button>按钮</button>
<input type="button" value="按钮">
<a href="#" data-role="button">按钮</a>
```

推荐您使用 `data-role="button"` 的 `<a>` 元素来创建页面之间的链接，
而 `<input>` 或 `<button>` 元素用于表单提交。

## 导航按钮

如需通过按钮来链接页面，请使用 `data-role="button"` 的 `<a>` 元素:

```html
<a href="#pagetwo" data-role="button">转到页面二</a>
```

## 行内按钮
默认情况下，按钮会占据屏幕的全部宽度。
如果您需要按钮适应其内容，或者如果您需要两个或多个按钮并排显示，请添加 `data-inline="true"`

```html
<a href="#pagetwo" data-role="button" data-inline="true">转到页面二</a>
```

## 组合按钮

请将 `data-role="controlgroup"` 属性与 `data-type="horizontal|vertical"` 一同使用，以规定水平或垂直地组合按钮：

```html
<div data-role="controlgroup" data-type="horizontal">
  <a href="#anylink" data-role="button">按钮 1</a>
  <a href="#anylink" data-role="button">按钮 2</a>
  <a href="#anylink" data-role="button">按钮 3</a>
</div>
```

## 后退按钮

如需创建后退按钮，请使用 `data-rel="back"` 属性（会忽略锚的 href 值）：

```html
<a href="#" data-role="button" data-rel="back">返回</a>
```

## 更多用于按钮的 data-* 属性

|属性					|值		|描述		|
|--|--|--|
|data-corners	|true					| false|规定按钮是否有圆角。|
|data-mini	|true					| false|规定是否是小型按钮。|
|data-shadow	|true	| false	|规定按钮是否有阴影。	|
