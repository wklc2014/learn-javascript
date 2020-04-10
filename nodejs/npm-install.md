# npm install

## webpack

+ webpack
+ webpack-cli
+ webpack-dev-server
+ webpack-merge
```
npm install --save-dev webpack webpack-cli webpack-dev-server webpack-merge
```

## webpack plugin

+ clean-webpack-plugin
+ copy-webpack-plugin
+ html-webpack-plugin
+ image-webpack-loader
+ uglifyjs-webpack-plugin
+ mini-css-extract-plugin

```
npm install --save-dev clean-webpack-plugin copy-webpack-plugin html-webpack-plugin image-webpack-loader uglifyjs-webpack-plugin mini-css-extract-plugin
```

## webpack loader

+ babel-core
+ babel-loader@7
+ babel-preset-env
+ babel-preset-react
+ babel-preset-stage-0
+ babel-plugin-import
+ babel-plugin-transform-decorators-legacy
+ css-loader
+ file-loader
+ html-loader
+ less
+ less-loader
+ less-plugin-autoprefix
+ less-plugin-clean-css
+ style-loader
+ url-loader

注意 `@babel/core` 和 `babel-loader` 的安装和版本。

```
npm install --save-dev babel-core babel-loader@7 babel-preset-env babel-preset-react babel-preset-stage-0 babel-plugin-import css-loader file-loader html-loader less less-loader less-plugin-autoprefix less-plugin-clean-css style-loader url-loader babel-plugin-transform-decorators-legacy
```

## other

+ cross-env

```
npm install --save-dev cross-env
```

## babel config

```
{
  "presets": [
    "env",
    "react",
    "stage-0"
  ],
  "plugins": [
    [
      "import", {
        "libraryName": "antd",
        "style": true
      }
    ],
    "transform-decorators-legacy"
  ],
}
```

## react

+ react
+ react-dom
+ react-router
+ react-router-dom
+ mobx
+ mobx-react
+ is-js
+ prop-types

+ antd
+ dayjs

```
npm install --save react react-dom react-router react-router-dom mobx mobx-react is_js prop-types
```
