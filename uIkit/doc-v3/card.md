# 卡片

创建具有不同样式的布局框。

## 用法

卡片组件由卡片本身、卡片主体、卡片标题（可选）组成。

```
<div class="uk-card uk-card-body">
  <div class="uk-card-title"></div>
</div>

<div class="uk-card">定义一个卡片组件</div>
<div class="uk-card-body">给卡片和卡片内容之间创建一个内边距</div>
<div class="uk-card-title">定义一个卡片标题</div>
```

默认情况下，卡片是空白无样式的，必须添加样式修饰 class。

```
<div class="uk-card uk-card-body uk-card-default">
  <div class="uk-card-title"></div>
</div>
```
## 样式修饰

```
<div class="uk-card-default"></div>
<div class="uk-card-primary"></div>
<div class="uk-card-secondary"></div>
```

## 鼠标悬停修饰

```
<div class="uk-card-hover"></div>
```

## 尺寸修改

```
<div class="uk-card-small"></div>
<div class="uk-card-large"></div>
```

## 页眉 & 页脚

```
<div class="uk-card">
    <div class="uk-card-header">
        <h3 class="uk-card-title"></h3>
    </div>
    <div class="uk-card-body"></div>
    <div class="uk-card-footer"></div>
</div>
```

## 媒体元素

要在卡片中显示图像，并且没有任何间隙，需要将以下 class 之一添加到 <code>img</code> 外围的 <code>div</code> 元素上。

```
<div class="uk-card-media-top">媒体元素顶部对齐</div>
<div class="uk-card-media-bottom">媒体元素底部对齐</div>
<div class="uk-card-media-left">媒体元素左侧对齐</div>
<div class="uk-card-media-right">媒体元素右侧对齐</div>

<div class="uk-card uk-card-default">
    <div class="uk-card-media-top">
        <img src="" alt="">
    </div>
    <div class="uk-card-body"></div>
</div>
```

> 感觉没什么用???

## 徽章

徽章元素设置了绝对定位。

```
<div class="uk-card uk-card-default">
  <div class="uk-card-brage">123</div>
</div>
```

