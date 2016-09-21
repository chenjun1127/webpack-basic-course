# webpack入门教程
####概述
Webpack是一款用户打包前端模块的工具。主要是用来打包在浏览器端使用的javascript的。同时也能转换、捆绑、打包其他的静态资源，包括css、image、font file、template等。个人认为它的优点就是易用，而且常用功能基本都有,另外可以通过自己开发loader和plugin来满足自己的需求。这里就尽量详细的来介绍下一些基本功能的使用。
####安装
Webpack可以使用npm安装； 
```javascript
npm install webpack -g
```
使用webpack
```javascript
npm init  # 会自动生成一个package.json文件
npm install webpack --save-dev #将webpack增加到package.json文件中
```
####WebPack的配置
每个项目下都必须配置有一个 webpack.config.js ，它的作用如同常规的 gulpfile.js/Gruntfile.js ，就是一个配置项，告诉 webpack 它需要做什么。
下面是一个比较完整的配置文件：
```javascript
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
    //插件项
    plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        index : './src/js/page/index.js'
    },
    //入口文件输出配置
    output: {
        path: 'dist/js/page',
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //其它解决方案配置
    resolve: {
        root: 'E:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};
```
* plugins 是插件项，这里使用了一个 CommonsChunkPlugin的插件，它用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用。
* entry 是页面入口文件配置，可以是一个文件或者多个入口文件，可以是对象格式或者数组格式。output 是对应输出项配置 （即入口文件最终要生成什么名字的文件、存放到哪里）
* module.loaders 是最关键的一块配置。它告知 webpack 每一种文件都需要使用什么加载器来处理。 所有加载器需要使用npm来加载
最后是 resolve 配置，配置查找模块的路径和扩展名和别名（方便书写）
#### WebPack开始使用
首先建立一个webpack-demo文件夹，在里面新建dist、src两个文件夹，再新建一个index.html文件；dist里面存放webpack生成的打包后的js文件，src里面再新建css,img,js等文件夹，用来存放demo所需要的原始数据、图片、js等。完整的目录结构如下所示：
```javascript
webpack-dmeo
>- dist
  >- bundle.js
>- src
  >- js
    >- entry.js
    >- module.js
  >- css
    >- style.css
  >- img
    >- pic.png(随便一张图片即可)
```

