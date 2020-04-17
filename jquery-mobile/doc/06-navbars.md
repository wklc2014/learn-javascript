# 导航栏

导航栏由一组水平排列的链接构成

默认地，导航栏中的链接会自动转换为按钮（无需 data-role="button"）。

请使用 data-role="navbar" 属性来定义导航栏：

```html
<div data-role="header">
  <div data-role="navbar">
    <ul>
      <li><a href="#anylink">首页</a></li>
      <li><a href="#anylink">页面二</a></li>
      <li><a href="#anylink">搜索</a></li>
    </ul>
  </div>
</div>
```

## 活动按钮

当导航栏中的链接被敲击时，会获得选取外观（按下）。

如需在不敲击链接时实现此外观，请使用 `class="ui-btn-active"`：

```html
<li><a href="#anylink" class="ui-btn-active">首页</a></li>
```






















