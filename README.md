# webpack入门教程
####概述
Webpack是一款用户打包前端模块的工具。主要是用来打包在浏览器端使用的javascript的。同时也能转换、捆绑、打包其他的静态资源，包括css、image、font file、template等。个人认为它的优点就是易用，而且常用功能基本都有,另外可以通过自己开发loader和plugin来满足自己的需求。这里就尽量详细的来介绍下一些基本功能的使用。
####安装
Webpack可以使用npm安装； 
```javascript
npm install webpack -g
```
####使用webpack
```javascript
npm init  会自动生成一个package.json文件
npm install webpack --save-dev 将webpack增加到package.json文件中
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
首先建立一个webpack-demo文件夹，在里面新建dist、src两个文件夹，再新建一个index.html文件；dist里面存放webpack生成的打包后的js文件，src里面再新建css、img、js等文件夹，用来存放demo所需要的原始数据、图片、js等。完整的目录结构如下所示：
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
    index.html
    package.json
    webpack.config.js
```
首先来看index.html文件，index.html文件只有最基础的html代码，它唯一的目的就是加载打包后的js文件（bundle.js）；
```javascript
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>webpack-demo</title>
</head>
<body>
	<script src="dist/bundle.js"></script>
</body>
</html>
```
module.js是一个返回的js模块；
```javascript
module.exports = {
	person: function(name, age, work) {
		return ('my name is ' + name + ',my age ' + age + ',' + work + ' is my work!');
	},
}
```
entry.js是一个用来接受模块的js文件；
```javascript
require("../css/style.css")
document.write('It works.' + '<br/>')
var Person = require('./module.js')
document.write(Person.person('jone', 30, 'teacher'));

var img = document.createElement('img');
img.src = require('../img/pic.png');
document.body.appendChild(img);
```
style.css是demo的基本样式
```css
body { background: yellow; }
```
####使用配置文件
1、默认的配置文件为webpack.config.js，为webpack.config.js增加以下代码：
```javascript
var webpack = require('webpack');
var path = require('path');
module.exports = {
	entry: './src/js/entry.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	//压缩打包的文件
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
			},
		})
	],
	module: {
		loaders: [
			{test: /\.css$/,loader: 'style!css'}, 
			{test: /\.(png|jpg)$/,loader: 'url?limit=8192'} /*loader可以省略*/
		]
	},
	devServer: {
	 
		colors: true, //终端中输出结果为彩色
		historyApiFallback: true, //不跳转
		inline: true, //实时刷新
		port:3800
	}
}
```
2、执行程序
```javascript
webpack
```
此时，可以看到在命令行中出现了带有颜色的成功日志，
```jvascript
Hash: e964f90ec65eb2c29bb9
Version: webpack 1.13.2
Time: 54ms
Asset Size Chunks Chunk Names
bundle.js 1.42 kB 0 [emitted] main
[0] ./entry.js 27 bytes {0} [built]
```
打开浏览器运行index.html，可以看到具体的页面效果了；
####使用webpack构建本地服务器
如果你想让你的浏览器监测代码的修改，并自动刷新修改后的结果，可以使用Webpack提供的一个可选的本地开发服务器，这个本地服务器基于node.js构建，它是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目依赖；
```javascript
npm install webpack-dev-server --save-dev
```
dev-server作为webpack配置选项中的一项，具有以下配置选项：
* contentBase --> 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该设置其所在目录。
* port --> 设置默认监听端口，如果省略，默认为“8080”。
* inline --> 设置为true，当源文件改变时会自动刷新页面。
* colors --> 设置为true，使终端输出的文件为彩色的。
* historyApiFallback --> 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html。

在上面配置文件中，修改了端口为3800，
运行：
```javascript	
webpack-dev-server
```
在浏览器直接访问：
```javascript
http://localhost:3800/
```
可看到页面效果。
#### 更多参考资料：
* http://www.jianshu.com/p/42e11515c10f#
* http://www.w2bc.com/Article/50764
* http://webpack.github.io/docs/
* http://www.cnblogs.com/shinggang/p/5034404.html


