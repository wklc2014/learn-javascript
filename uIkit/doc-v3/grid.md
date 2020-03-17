# 网格

创建响应式的、可嵌套的、流体网格布局

## 用法

要创建网格容器，请将 <code>uk-grid</code> 属性添加到 <code>div</code> 元素中。

在容器中添加 <code>div</code> 创建网格单元。

默认情况下，所有的网格单元都是堆叠排列的。

要并排放置它们，需要使用 <code>width</code> 组件。

```
<div class="uk-child-width-expand" uk-grid>
  <div></div>
  <div></div>
</div>
```

<code>card</code> 组件通常在网格中使用。

```
<div class="uk-child-width-expand@s uk-text-center" uk-grid>
    <div>
        <div class="uk-card uk-card-default uk-card-body">Item</div>
    </div>
    <div>
        <div class="uk-card uk-card-default uk-card-body">Item</div>
    </div>
    <div>
        <div class="uk-card uk-card-default uk-card-body">Item</div>
    </div>
</div>
```
