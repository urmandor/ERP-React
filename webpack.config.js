var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.jsx',
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js',
	},
	devtool: 'inline-sourcemap',
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(ttf|eot|svg|png|jpg|gif)(\?v=[0-9].[0-9].[0-9])?$/,
				loader: 'file-loader?name=[name].[ext]',
			},
			{
				test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
				loader: 'url-loader?mimetype=application/font-woff',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			inject: 'body',
		}),
	],
	devServer: {
		historyApiFallback: true,
		port: 9000,
	},
	externals: {
		// global app config object
		config: JSON.stringify({
			apiUrl: 'http://localhost:4000',
		}),
	},
};
