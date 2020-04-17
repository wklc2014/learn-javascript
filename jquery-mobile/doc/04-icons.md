# 图标

如需向您的按钮添加图标，请使用 `data-icon` 属性：

```html
<a href="#anylink" data-role="button" data-icon="search">搜索</a>
```



|属性值	|描述	|
|--|--|
|data-icon="arrow-l"	|左箭头	|
|data-icon="arrow-r"	|右箭头	|
|data-icon="delete"	|删除	|
|data-icon="info"	|信息	|
|data-icon="home"	|首页	|
|data-icon="back"	|返回	|
|data-icon="search"	|搜索	|
|data-icon="grid"		|网格		|


## 定位图标

请使用 `data-iconpos` 属性来规定位置：

```html
<a href="#link" data-role="button" data-icon="search" data-iconpos="top">上</a>
<a href="#link" data-role="button" data-icon="search" data-iconpos="right">右</a>
<a href="#link" data-role="button" data-icon="search" data-iconpos="bottom">下</a>
<a href="#link" data-role="button" data-icon="search" data-iconpos="left">左</a>
```

## 只显示图标

```html
<a href="#link" data-role="button" data-icon="search" data-iconpos="notext">搜索</a>
```