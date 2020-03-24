# 警告

显示成功，警告和错误消息。

## 用法

要使用这个组件，请将 `uk-alert` 属性添加到块元素。

```
<div uk-alert></div>
```

## 关闭按钮

要创建关闭按钮并启用其功能，请将 `.uk-alert-close` 类添加到警告框中的 &lt;button&gt; 或 &lt;a&gt; 元素内。

要应用关闭图标，请将 `uk-close` 属性添加到关闭组件。

```
<div uk-alert>
    <a class="uk-alert-close" uk-close></a>
</div>
```

## 样式修饰

有几种样式修饰符可用。 只需添加以下类之一即可应用不同的外观。

|CLASS						|DESCRIPTION						|
|--|--|
|.uk-alert-primary|给消息一个突出的样式。	|
|.uk-alert-success|表示成功的消息。				|
|.uk-alert-warning|表示警告的消息。				|
|.uk-alert-danger	|表示重要或错误的消息		|