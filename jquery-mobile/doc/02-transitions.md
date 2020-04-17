# 过渡

使用 CSS3 3D 转换

过渡效果可应用于任意链接
或通过使用 `data-transition` 属性进行的表单提交

```html
<a 
  href="#anylink" 
  data-transition="slide"
>
  滑动到页面二
</a>
```

|过渡 |描述 |
|-----------|---------------------------|
|fade       |默认。淡入淡出到下一页。    |
|flip       |从后向前翻动到下一页。      |
|flow       |抛出当前页面，引入下一页。  |
|pop        |像弹出窗口那样转到下一页。  |
|slide      |从右向左滑动到下一页。      |
|slidefade  |从右向左滑动并淡入到下一页。|
|slideup    |从下到上滑动到下一页。      |
|slidedown  |从上到下滑动到下一页。      |
|turn       |转向下一页。                |
|none       |无过渡效果。                |

以上所有效果同时支持反向动作
例如，如果您希望页面从左向右滑动，而不是从右向左，请使用 `data-direction="reverse"`。在后退按钮上是默认的。

```html
<a 
  href="#pagetwo" 
  data-transition="slide" 
  data-direction="reverse"
>
  滑动
</a>
```