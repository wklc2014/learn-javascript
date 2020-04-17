# 页面

## 基本使用
```html
<div data-role="page">
  <div data-role="header"></div>
  <div data-role="content"></div>
  <div data-role="footer"></div>
</div>
```

+ data-role="page"
是显示在浏览器中的页面
+ data-role="header"
创建页面上方的工具栏（常用于标题和搜索按钮）
+ data-role="content"
定义页面的内容，比如文本、图像、表单和按钮，等等
+ data-role="footer"
创建页面底部的工具栏

## 添加页面

在单一 HTML 文件中创建多个页面
```html
<div data-role="page" id="pageone">
  <div data-role="content">
    <a href="#pagetwo">转到页面二</a>
  </div>
</div>

<div data-role="page" id="pagetwo">
  <div data-role="content">
    <a href="#pageone">转到页面一</a>
  </div>
</div>
```

也可以使用外部页面
```html
<a href="externalfile.html">转到外部页面</a>
```

## 将页面用作对话框
向该链接添加 `data-rel="dialog"`

```html
<div data-role="page" id="pageone">
  <div data-role="content">
    <a href="#pagetwo" data-rel="dialog">转到页面二</a>
  </div>
</div>

<div data-role="page" id="pagetwo">
  <div data-role="content">
    <a href="#pageone">转到页面一</a>
  </div>
</div>
```