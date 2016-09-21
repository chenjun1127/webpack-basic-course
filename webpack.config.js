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