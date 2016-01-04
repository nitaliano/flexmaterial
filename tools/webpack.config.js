var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var LESS_LOADERS = ['css', 'postcss', 'less'];
var PROJECT_NAME = 'flexmaterial';

var AUTOPREFIXER_BROWSERS = [
	'Android >= 4',
	'Chrome >= 20',
	'Firefox >= 24',
	'Explorer >= 9',
	'iOS >= 6',
	'Opera >= 12',
	'Safari >= 6'
];

var config = {
	entry: {
		app: ['./src/' + PROJECT_NAME]
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style-loader', LESS_LOADERS.join('!'))
			}
		]
	},
	output: {
		filename: PROJECT_NAME + '.js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/dist'
	},
	plugins: [
		new ExtractTextPlugin(PROJECT_NAME + '.css')
	],
	postcss: [
		autoprefixer(AUTOPREFIXER_BROWSERS)
	],
	resolve: {
		extensions: ['', '.js', '.less'],
		modulesDirectories: ['src', 'node_modules']
	}
};

module.exports = config;