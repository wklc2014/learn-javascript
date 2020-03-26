# 手风琴

创建可以通过单击项目标题单独显示的项目列表

## 用法

手风琴组件由 具有 `uk-accordion` 属性的`父容器`以及每个`手风琴项目`的`标题`和`内容`部分组成。

```
<ul uk-accordion>
  <li>
    <a class="uk-accordion-title" href="#">标题一</a>
    <div class="uk-accordion-content">内容一</div>
  </li>
  <li>
    <a class="uk-accordion-title" href="#">标题二</a>
    <div class="uk-accordion-content">内容二</div>
  </li>
</ul>
```


## 无收缩

默认情况下，是可以折叠手风琴所有项目的。
若要始终保持一个展开的项目， 请将 `collapsible: false` 选项添加到配置属性中。

```
<ul uk-accordion="collapsible: false">...</ul>
```

## 多个展开项目

若要同时显示多个内容节，
而其中一个在另一个内容节打开时不折叠，
请将 `multiple: true` 选项添加到 `uk-accordion` 属性中。

```
<ul uk-accordion="multiple: true">...</ul>
```

## 设置默认展开项目

如果指定默认展开的项目，请将 `.uk-open` 类添加到该项。
也可以使用此选项打开多个项目，
只需确保将选项 `multiple: true` 添加到 `uk-accordion` 属性即可。

>  或者，可以通过将 `active: <index>` 选项添加到 `uk-accordion` 性来打开单个项，例如 `active: 1` 以显示第二个元素（索引从零开始）。<br/>
> 请注意，这将覆盖 `uk-open` 类。

```
<ul uk-accordion>
  <li></li>
  <li class="uk-open"></li>
  <li></li>
</ul>
```


## 组件选项

| OPTION    | VALUE | DEFAULT |DESCRIPTION	|
|--	        |--	    |--	      |--           |
|active			|Number	|false	  |默认初始要打开的元素|
|animation	|Boolean|true			|直接显示项目或通过过渡显示项目|
|collapsible|Boolean|true			|允许关闭所有项目		|
|content		|String	|> .uk-accordion-content|内容选择器，用于选择相应的手风琴内容元素						|
|duration		|Number	|200			|动画持续时间（毫秒）	|
|multiple		|Boolean|false		|允许多个打开的项		|
|targets		|String	|> *			|要切换的元素的CSS选择器|
|toggle			|String	|> .uk-accordion-title	|切换选择器，用于切换手风琴项目|
|transition	|String	|ease			|显示项目时要使用的过渡。 使用关键字来实现缓动功能|
|offset			|Number	|0				|向滚动到顶部添加像素偏移	|

## JavaScript

### 初始化

```
UIkit.accordion(element, options);
```

### 事件

|NAME				|DESCRIPTION		|
| --        | ---       |
|beforeshow	|在显示项目之前触发。 可以通过在事件上调用preventDefault() 来阻止显示。	|
|show				|显示一个项目后触发。																										|
|shown			|在项目的过渡动画完成后触发。																						|
|beforehide	|在隐藏项之前触发。可以通过对事件调用preventDefault() 来阻止隐藏。			|
|hide				|在项目的隐藏动画启动后触发。																						|
|hidden			|项目被隐藏后触发。	|


## 方法

以下方法可用于该组件：

切换

```
UIkit.accordion(element).toggle(index, animate);
```

|NAME		|TYPE									|DEFAULT|DESCRIPTION	 |
| -- | -- | -- | -- |
|index	|String, Integer, Node|0			|手风琴窗格进行切换。 从0开始的索引。	|
|animate|Boolean							|true		|通过传递false来控制打开动画。				|