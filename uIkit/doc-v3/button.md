# 按钮

轻松创建外观精美的按钮，它们具有不同的样式。

## 用法

要使用此组件，请将 .uk-button class 和 .uk-button-default 等修饰符添加到 <a> 或 <button> 元素。

将 disabled 属性添加到 <button> 元素可以禁用按钮。

```
<a href="#" class="uk-button uk-button-default">按钮</a>
<button type="button" class="uk-button uk-button-primary">按钮</button>
```

## 样式修饰

```
<button class="uk-button-default">
  默认按钮样式。
</button>
<button class="uk-button-primary">
  表示主要动作。
</button>
<button class="uk-button-secondary">
  表示重要的动作。
</button>
<button class="uk-button-danger">
  表示危险或负面行为。
</button>
<button class="uk-button-text">
  应用替代的印刷样式。
</button>
<button class="uk-button-link">
  制造一个 <button> 使它看起来和 <a> 元素一样。
</button>
```

## 尺寸修改

```
<button class="uk-button uk-button-default uk-button-small"></button>

<button class="uk-button uk-button-default uk-button-large"></button>
```

## 宽度修改器

从 Width 组件中添加 .uk-width-1-1 class 按钮可以使该按钮占据整个宽度。

```
<button class="uk-button uk-button-secondary uk-width-1-1">Button</button>
```

## 按钮组

```
<div class="uk-button-group">
    <button class="uk-button uk-button-default"></button>
    <button class="uk-button uk-button-default"></button>
    <button class="uk-button uk-button-default"></button>
</div>
```

## 带下拉菜单的按钮

可以使用按钮来触发 Dropdown 菜单组件的下拉菜单。

```
<!-- A button toggling a dropdown -->
<button class="uk-button uk-button-default" type="button"></button>
<div uk-dropdown></div>
```

## 带有下拉菜单的按钮组

```
<!-- A button group with a dropdown -->
<div class="uk-button-group">
    <button class="uk-button uk-button-default"></button>
    <div class="uk-inline">
        <!-- The button toggling the dropdown -->
        <button class="uk-button uk-button-default" type="button"></button>
        <div uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: true;"></div>
    </div>
</div>
```
